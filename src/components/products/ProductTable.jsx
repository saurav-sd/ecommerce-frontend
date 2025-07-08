import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import {
  getAllProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../auth/api";
import ProductTableRow from "./ProductTableRow";
import ProductFormModal from "./ProductFormModal";

const ITEMS_PER_PAGE = 5;

const ProductTable = () => {
  const { accessToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleSave = async (form) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, form);
      } else {
        await createProduct(form);
      }
      fetchProducts();
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      filtered = filtered.filter((p) =>
        (p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (accessToken) fetchProducts();
  }, [accessToken]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, minPrice, maxPrice]);

  // Pagination
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center group"
            onClick={handleAdd}
          >
            Add Product
          </button>
        </div>
        <p className="text-gray-600">Discover our curated collection of premium products</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-32"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500 w-32"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded border ${
                page === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductTable;
