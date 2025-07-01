import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById, getAllProducts } from "../../auth/api";

const BASE_IMAGE_URL = "http://127.0.0.1:8000";

export default function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getOrderById(orderId).then((res) => setOrder(res.data));
    getAllProducts().then((res) => setProducts(res.data));
  }, [orderId]);

  const getProductDetails = (id) => products.find((p) => p.id === id);

  if (!order) return <p className="p-4">Loading order details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Order #{order.id}</h2>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Status:</span> {order.status}
      </p>
      <p className="text-gray-700 mb-1">
        <span className="font-medium">Total Amount:</span> ₹{order.total_amount}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Placed On:</span>{" "}
        {new Date(order.created_at).toLocaleString()}
      </p>

      <h3 className="text-xl font-semibold mb-2">Items</h3>
      <div className="space-y-4">
        {order.items.map((item) => {
          const product = getProductDetails(item.product_id);
          const imageUrl = product.image.startsWith("http") ? product.image : `${BASE_IMAGE_URL}${product.image}`;
          return (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 border rounded shadow-sm"
            >
              {product?.image && (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium">{product?.title || "Product"}</p>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
