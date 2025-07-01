import { useCart } from "../../hooks/useCart";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../auth/api";
import { useNavigate } from "react-router-dom";

const BASE_IMAGE_URL = "http://127.0.0.1:8000";

export default function CartPage() {
  const { cart, updateItem, removeItem, clear } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((res) => setProducts(res.data));
  }, []);

    const getProductDetails = (id) => products.find((p) => p.id === id);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const product = getProductDetails(item.product_id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            const product = getProductDetails(item.product_id);
            const imageUrl = product.image.startsWith("http")
              ? product.image
              : `${BASE_IMAGE_URL}${product.image}`;

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-full md:w-24 h-24 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                  {product?.image ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No Image</span>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {product?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: ₹{product?.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateItem(item.id, item.quantity + 1)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateItem(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          <div className="flex justify-between items-center mt-8 border-t pt-4">
            <p className="text-xl font-semibold text-gray-800">
              Total: ₹{calculateTotal()}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={clear}
                className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md"
              >
                Clear Cart
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
