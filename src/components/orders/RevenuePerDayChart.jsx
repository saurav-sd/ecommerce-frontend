import { useEffect, useState } from "react";
import { getOrder } from "../../auth/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { useAuth } from "../../auth/AuthProvider";

const RevenuePerDayChart = () => {
  const { accessToken } = useAuth();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const res = await getOrder();
          const grouped = {};

          res.data.forEach((order) => {
            const date = order.created_at.split("T")[0];
            if (!grouped[date]) grouped[date] = 0;
            grouped[date] += order.total_amount;
          });

          const result = Object.entries(grouped).map(([date, revenue]) => ({
            date,
            revenue,
          }));

          setChartData(result);
        } catch (error) {
          console.error("Error fetching revenue data:", error);
        }
      };

      fetchData();
    }
  }, [accessToken]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="revenue" stroke="#28a745" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenuePerDayChart;
