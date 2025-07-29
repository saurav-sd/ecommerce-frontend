import { useState, useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { getAllProducts, checkoutOrder } from "../../auth/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BASE_IMAGE_URL = "https://ecommerce-dashboard-backend-1.onrender.com/static/images/";

export default function CheckoutPage() {
    const navigate = useNavigate();
  const { cart, clear } = useCart();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    shipping_address: "",
    billing_address: "",
    payment_method: "COD",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

  const getProductDetails = (id) => products.find((p) => p.id === id);

  const total = cart.reduce((sum, item) => {
    const product = getProductDetails(item.product_id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Placing your order...");
    try {
      const response = await checkoutOrder(form);
      toast.success("Order placed successfully!", { id: toastId });
      navigate(`/order-success/${response.data.id}`);
      clear();
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
      >
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Shipping Address</label>
            <textarea
              required
              className="w-full border rounded p-2"
              value={form.shipping_address}
              onChange={(e) =>
                setForm({ ...form, shipping_address: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Billing Address</label>
            <textarea
              className="w-full border rounded p-2"
              value={form.billing_address}
              onChange={(e) =>
                setForm({ ...form, billing_address: e.target.value })
              }
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Payment Method</label>
            <select
              className="w-full border rounded p-2"
              value={form.payment_method}
              onChange={(e) =>
                setForm({ ...form, payment_method: e.target.value })
              }
            >
              <option value="COD">Cash on Delivery</option>
              <option value="UPI">UPI</option>
              <option value="CARD">Card</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Cart Summary</h3>
          {cart.map((item) => {
              const product = getProductDetails(item.product_id);
              const imageUrl = product.image.startsWith("http")
              ? product.image
              : `${BASE_IMAGE_URL}${product.image}`;
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-2 rounded"
              >
                <img
                  src={imageUrl}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{product?.title}</p>
                  <p className="text-sm text-gray-600">
                    ₹{product?.price} x {item.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
        </div>
      </form>
    </div>
  );
}
