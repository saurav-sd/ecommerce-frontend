// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const login = async (credentials) => {
    const res = await api.loginUser(credentials);
    setAccessToken(res.data.access_token);
    localStorage.setItem("access_token", res.data.access_token); // Store token in localStorage
    localStorage.setItem("refresh_token", res.data.refresh_token); // Store refresh token if needed
    setUser(res.data.user); // Assuming your backend sends back user info
  };

  const register = async (formData) => {
    await api.registerUser(formData);
  };

  const logout = async () => {
    await api.logoutUser();
    setAccessToken(null);
    localStorage.removeItem("access_token"); // Clear token from localStorage
    localStorage.removeItem("refresh_token"); // Clear refresh token from localStorage
    setUser(null);
  };

  const refresh = async () => {
    try {
      const res = await api.refreshToken();
      setAccessToken(res.data.access_token);
    } catch (err) {
      console.error("Token refresh failed");
      logout();
    }
  };

  useEffect(() => {
    // On mount, try refreshing token
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, register }}>
      {!loading ? children : <div className="text-center p-4">Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
