import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load saved tokens + user on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setAccessToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const res = await api.loginUser(credentials);
    const { access_token, refresh_token, id, email, role } = res.data;

    const userData = { id, email, role };

    setAccessToken(access_token);
    setUser(userData);

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await api.logoutUser(); // Optional if endpoint exists
    } catch (err) {
      console.warn("Logout error:", err);
    }

    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };

  const register = async (userData) => {
  try {
    const res = await api.registerUser(userData); // Your API call
    return res;
  } catch (err) {
    console.error("Registration failed:", err);
    throw err;
  }
};


  // ✅ Refresh token logic
  const refresh = async () => {
    try {
      const res = await api.refreshToken();
      setAccessToken(res.data.access_token);
      localStorage.setItem("access_token", res.data.access_token);
    } catch (err) {
      console.error("Token refresh failed");
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, register, refresh }}>
      {!loading ? children : <div className="text-center p-4">Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
