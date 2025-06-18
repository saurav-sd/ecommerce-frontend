import React, { useEffect, useState } from "react";
import { getAllProducts, getCategory, getOrder } from "../auth/api";
import ChartTabs from "../components/orders/ChartTabs";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res1 = await getAllProducts();
      const res2 = await getCategory();
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
   <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Products" value={stats.products} />
        <Card title="Total Categories" value={stats.categories} />
        <Card title="Total Orders" value={stats.orders} />
      </div>
      <div className="mt-6">
        <ChartTabs />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl mt-2 font-bold text-blue-600">{value}</p>
    </div>
  );
}
