import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../auth/api";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCartItems();
      setCart(res.data);
    } catch (err) {
      toast.error("Failed to load cart");
    }
  };

  const addItem = async (product_id, quantity) => {
    try {
      toast.loading("Adding to cart...");
      await addToCart({ product_id, quantity });
      toast.dismiss();
      toast.success("Added to cart");
      fetchCart();
    } catch (err) {
      toast.dismiss();
      toast.error("Error adding to cart");
    }
  };

  const updateItem = async (id, quantity) => {
    try {
      await updateCartItem(id, { quantity });
      toast.success("Cart updated");
      fetchCart();
    } catch (err) {
      toast.error("Error updating cart");
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCartItem(id);
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };

  const clear = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
      fetchCart();
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, fetchCart, addItem, updateItem, removeItem, clear };
};
