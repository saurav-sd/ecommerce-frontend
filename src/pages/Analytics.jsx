import React, { useEffect, useState } from "react";
import { getAllProducts, getAllCategories, getOrder } from "../auth/api";
import ChartTabs from "../components/orders/ChartTabs";
import { Package, LayoutGrid, ShoppingCart, ArrowUpRight } from "lucide-react";

const Analytics = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res1 = await getAllProducts();
      const res2 = await getAllCategories();
      const res3 = await getOrder();
      setStats({
        products: res1.data.length,
        categories: res2.data.length,
        orders: res3.data.length,
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">📊 Dashboard Overview</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Products"
          value={stats.products}
          icon={<Package className="h-6 w-6 text-blue-500" />}
          trend="+12.3%"
          trendColor="text-green-500"
        />
        <MetricCard
          title="Total Categories"
          value={stats.categories}
          icon={<LayoutGrid className="h-6 w-6 text-purple-500" />}
          trend="+8.5%"
          trendColor="text-green-500"
        />
        <MetricCard
          title="Total Orders"
          value={stats.orders}
          icon={<ShoppingCart className="h-6 w-6 text-orange-500" />}
          trend="+6.2%"
          trendColor="text-green-500"
        />
      </div>

      {/* Chart Tabs */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">📈 Order & Revenue Analytics</h3>
        <ChartTabs />
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon, trend, trendColor }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="text-gray-600">{title}</div>
        {icon}
      </div>
      <div className="mt-3 text-3xl font-bold text-gray-900">{value}</div>
      <div className={`mt-1 text-sm flex items-center ${trendColor}`}>
        <ArrowUpRight className="h-4 w-4 mr-1" />
        {trend}
      </div>
    </div>
  );
};

export default Analytics;
