import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, getAllProducts } from "../../auth/api";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOrderById(orderId).then((res) => setOrder(res.data));
    getAllProducts().then((res) => setProducts(res.data));
  }, [orderId]);

  const getProductDetails = (id) => products.find((p) => p.id === id);

  if (!order) return <p className="p-6 text-gray-600">Loading order details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Order #{order.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="text-gray-700 space-y-1">
          <p><span className="font-semibold">Status:</span> {order.status}</p>
          <p><span className="font-semibold">Placed On:</span> {new Date(order.created_at).toLocaleString()}</p>
        </div>
        <div className="text-gray-700 space-y-1">
          <p><span className="font-semibold">Total Amount:</span> ₹{order.total_amount}</p>
          <p><span className="font-semibold">Items:</span> {order.items.length}</p>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Order Items</h3>

      <div className="space-y-4">
        {order.items.map((item) => {
          const product = getProductDetails(item.product_id);
          const imageUrl = product?.image;

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition"
            >
              {product?.image && (
                <img
                  src={imageUrl}
                  alt={product?.title || "Product"}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{product?.title || "Unnamed Product"}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">Subtotal: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
