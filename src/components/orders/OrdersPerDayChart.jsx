import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useAuth } from "../../auth/AuthProvider";
import { getOrder } from "../../auth/api";

const OrdersPerDayChart = () => {
  const { accessToken } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrder();
        const grouped = {};

        res.data.forEach(order => {
          const date = order.created_at.split("T")[0]; // Extract YYYY-MM-DD
          if (!grouped[date]) {
            grouped[date] = 1;
          } else {
            grouped[date] += 1;
          }
        });

        const result = Object.entries(grouped).map(([date, count]) => ({
          date,
          order_count: count
        }));

        setChartData(result);
      } catch (error) {
        console.error("Error fetching orders per day:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-xl mt-6">
        <h2 className="text-lg font-semibold mb-4">Orders per Day</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="order_count" stroke="#007bff" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)
}

export default OrdersPerDayChart