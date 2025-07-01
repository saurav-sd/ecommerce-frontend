import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Admin Panel</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 hover:cursor-pointer">{user?.email || "User"}</span>
        <Link to="/cart" className="relative">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
