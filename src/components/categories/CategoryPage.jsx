import { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../auth/api";
import CategoryCard from "./CategoryCard";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "",  description: "" });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  const filteredCategories = categories.filter((cat) =>
  cat.name?.toLowerCase().includes(searchQuery.toLowerCase())
);

  const handleSubmit = async () => {
    if (editingId) {
      await updateCategory(editingId, form);
      toast.success("Category updated successfully");
    } else {
      await createCategory(form);
      toast.success("Category created successfully");
    }
    setForm({ name: "", description: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (category) => {
    setForm({ name: category.name });
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      toast.success(`Category deleted successfully with ID: ${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-2xl font-bold">Categories</h2> */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of product categories and find exactly what you're looking for
          </p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Category
        </button>
      </div>

      <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

      <CategoryForm
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingId(null);
        }}
        onSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        editingId={editingId}
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          filteredCategories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={handleEdit}
              onDelete={handleDelete}
              setModalOpen={setModalOpen}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
