import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getOrder } from "../../auth/api";
import { useAuth } from "../../auth/AuthProvider";

// Optional: define some custom colors
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

const OrderStatusPieChart = () => {
  const [statusData, setStatusData] = useState([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getOrder();
          const counts = {};
          res.data.forEach((order) => {
            counts[order.status] = (counts[order.status] || 0) + 1;
          });

          const formatted = Object.entries(counts).map(([status, value]) => ({
            name: status,
            value,
          }));

          setStatusData(formatted);
        } catch (error) {
          console.error("Error fetching order status data:", error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  return (
    <div className="bg-white p-4 shadow-md rounded-xl mt-6">
      <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderStatusPieChart;
