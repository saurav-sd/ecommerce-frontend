import { useCart } from "../../hooks/useCart";

const BASE_IMAGE_URL = "https://ecommerce-dashboard-backend-1.onrender.com/static/images/";

const ProductTableRow = ({ product, onEdit, onDelete }) => {
  const { addItem } = useCart();
  const imageUrl = product.image.startsWith("http")
    ? product.image
    : `${BASE_IMAGE_URL}${product.image}`;

  return (
    <tr key={product.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-md object-cover" src={imageUrl} alt={product.title} />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.title}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-semibold">₹{product.price}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => addItem(product.id, 1)}
          className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onEdit(product)}
          className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-900 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;