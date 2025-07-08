import { Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "../../auth/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    try {
      const res = await subscribeToNewsletter(email);
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Subscription failed");
    }
  };

  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-16 w-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Offers
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive deals, and special discounts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </button>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
