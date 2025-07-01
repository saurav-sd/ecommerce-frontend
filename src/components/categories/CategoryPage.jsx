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

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "",  description: "" });
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("form : ", form)

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

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
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Category
        </button>
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
          categories.map((cat) => (
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
