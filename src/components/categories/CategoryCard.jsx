import { Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryCard = ({ category, onEdit, onDelete, setModalOpen }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between hover:shadow-xl"
    >
      <div>
        <h3 className="text-lg font-bold">{category.name}</h3>
        <p className="text-gray-600 text-sm">{category.description}</p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onEdit(category) || setModalOpen(true)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
