import { useState } from "react";
import OrdersPerDayChart from "./OrdersPerDayChart";
import RevenuePerDayChart from "./RevenuePerDayChart";
import OrderStatusPieChart from "./OrderStatusPieChart";

const ChartTabs = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="bg-white p-4 shadow-md rounded-xl mt-6">
      <div className="flex space-x-4 mb-4 border-b">
        <button
          className={`pb-2 ${
            activeTab === "orders"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders Per Day
        </button>
        <button
          className={`pb-2 ${
            activeTab === "revenue"
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("revenue")}
        >
          Revenue Per Day
              </button>
        <button
          className={`pb-2 ${
            activeTab === "status"
              ? "border-b-2 border-purple-500 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("status")}
        >
          Order Status
        </button>
      </div>

      {activeTab === "orders" && <OrdersPerDayChart />}
      {activeTab === "revenue" && <RevenuePerDayChart />}
      {activeTab === "status" && <OrderStatusPieChart />}
    </div>
  );
};

export default ChartTabs;
