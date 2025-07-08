import { useState, useEffect } from "react";
import { uploadImage } from "../../auth/api";

export default function ProductFormModal({ isOpen, onClose, onSave, product }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    category_id: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm({ title: "", description: "", price: "", stock: "", image: "" });
    }
  }, [product]);

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const form = new FormData();
  form.append("file", file);

  setUploading(true);
  try {
    const res = await uploadImage(form);
    setForm((prev) => ({ ...prev, image: res.data.image_url }));
  } catch (err) {
    console.error("Image upload failed", err);
  } finally {
    setUploading(false);
  }
};

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full border p-2 rounded"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="category_id"
            placeholder="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border p-2 rounded"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading ? <p>Uploading...</p> : form.image && <img src={form.image} alt="Uploaded" className="w-32 mt-2" />}
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
            Save
          </button>
        </div>
        </form>
      </div>
    </div>
  );
}