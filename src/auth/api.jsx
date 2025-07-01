// src/auth/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

// 🔐 Automatically attach access token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = (data) => {
  const formData = new URLSearchParams();
  formData.append("username", data.email);
  formData.append("password", data.password);
  return API.post("/auth/login", formData);
};

export const refreshToken = () => API.post("/auth/refresh-token");

export const logoutUser = () => {
  const refresh_token = localStorage.getItem("refresh_token");
  return API.post("/auth/logout", { refresh_token });
};

// Order API
export const getOrder = () => API.get("/orders/");
export const getOrderById = (id) => API.get(`/orders/${id}`);

// Product APIs
export const getAllProducts = () => API.get("/products/");
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (product) => API.post("/products/", product);
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);
export const uploadImage = (formData) =>
  API.post("/products/upload-image/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Category APIs
export const getAllCategories = () => API.get("/categories/");
export const createCategory = (data) => API.post("/categories/", data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// --- Cart APIs ---
export const getCartItems = () => API.get("/cart/");
export const addToCart = (item) => API.post("/cart/", item);
export const updateCartItem = (cartId, item) => API.put(`/cart/${cartId}`, item);
export const removeCartItem = (cartId) => API.delete(`/cart/${cartId}`);
export const clearCart = () => API.delete("/cart/");

// Checkout API
export const checkoutOrder = (orderData) => {
  return API.post("/checkout/", orderData);
}

