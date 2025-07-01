export const Badge = ({ children, className = "" }) => {
  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full ${className}`}>
      {children}
    </span>
  );
};
