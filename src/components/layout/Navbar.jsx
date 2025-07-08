import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">ShopHub</Link>
            </h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/analytics" className="text-gray-700 hover:text-blue-600 transition-colors">Analytics</Link>
            <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600 transition-colors">Orders</Link>
          </nav>
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent flex-1 outline-none text-gray-700"
            />
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setIsUserPopupOpen(!isUserPopupOpen)}
              >
                <User className="h-6 w-6 text-gray-700" />
              </button>
              {isUserPopupOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 z-50">
                  <p className="text-sm text-gray-600">👤 <strong>{user?.email}</strong></p>
                  <p className="text-xs text-gray-500 mb-3 capitalize">Role: {user?.role}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <Link to="/cart" className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </Link>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-4">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent flex-1 outline-none text-gray-700"
              />
            </div>
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Products</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
