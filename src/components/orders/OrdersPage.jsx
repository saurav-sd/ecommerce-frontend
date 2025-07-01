import { useEffect, useState } from "react";
import { getOrder } from "../../auth/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrder()
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Order #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <Link
                  to={`/orders/${order.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details →
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Status: <strong>{order.status}</strong>
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Total: ₹{order.total_amount.toFixed(2)}
                </span>
                <span className="bg-gray-100 px-2 py-1 rounded">
                  Items: {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
