import { useEffect, useState } from "react";
import {
  getAllCategories,
  deleteCategory,
  createCategory,
  updateCategory,
} from "../../auth/api";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCategory(editingId, form);
    } else {
      await createCategory(form);
    }
    setForm({ name: "" });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setForm({ name: cat.name });
    setEditingId(cat.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      fetchCategories();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ name: e.target.value })}
          placeholder="Category name"
          required
          className="border p-2 rounded w-64"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id} className="border-t">
                <td className="p-3">{cat.id}</td>
                <td className="p-3">{cat.name}</td>
                <td className="p-3 text-right">
                  <button onClick={() => handleEdit(cat)} className="mr-2 text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
