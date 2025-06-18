import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li><Link to="/" className="block hover:text-blue-600">Home</Link></li>
        <li><Link to="/products" className="block hover:text-blue-600">Products</Link></li>
        <li><Link to="/categories" className="block hover:text-blue-600">Categories</Link></li>
        <li><Link to="/orders" className="block hover:text-blue-600">Orders</Link></li>
      </ul>
    </div>
  );
}
