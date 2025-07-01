import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <CheckCircle size={80} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6">
              Thank you for your purchase. We'll send you a confirmation email shortly.
              Your Order ID is: <span className="font-semibold">{orderId}</span>
      </p>
      <Link
        to={`/orders/${orderId}`}
        className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
      >
        View My Orders
      </Link>
    </div>
  );
}
