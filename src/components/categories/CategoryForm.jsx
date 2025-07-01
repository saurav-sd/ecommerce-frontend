

const CategoryForm = ({ isOpen, onClose, onSubmit, form, setForm, editingId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">{editingId ? "Update" : "Add"} Category</h2>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            onClose();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Category name"
            required
            className="border p-2 rounded w-full"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Category description"
            className="border p-2 rounded w-full"
          ></textarea>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm