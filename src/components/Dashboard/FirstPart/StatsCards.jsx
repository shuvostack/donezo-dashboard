import { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowUpRight, FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from "react-icons/fi";
import { motion } from "framer-motion";

const StatsCards = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    growth: 0,
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://task-api-eight-flax.vercel.app/api/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardsInfo = [
    { title: "Total Users", value: stats.totalUsers.toLocaleString(), subText: "Total registered users", subIcon: <FiUsers />, isActive: true },
    { title: "Active Users", value: stats.activeUsers.toLocaleString(), subText: "Currently active on platform", subIcon: <FiActivity />, isActive: false },
    { title: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, subText: "Increased from last month", subIcon: <FiDollarSign />, isActive: false },
    { title: "Growth Rate", value: `${stats.growth}%`, subText: "Overall platform growth", subIcon: <FiTrendingUp />, isActive: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {cardsInfo.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`relative p-6 rounded-[24px] shadow-sm ${
            card.isActive 
              ? "bg-gradient-to-br from-[#023b2e] via-[#045544] to-[#0c9664] text-white border-none" 
              : "bg-white text-gray-900 border border-gray-100"
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className={`font-semibold text-[15px] ${card.isActive ? "text-gray-100" : "text-gray-900"}`}>
              {card.title}
            </h3>
            
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                card.isActive 
                  ? "bg-white border-none text-[#045544] hover:scale-105 shadow-sm" 
                  : "border-gray-900 text-gray-900 hover:bg-gray-50"
              }`}
            >
              <FiArrowUpRight className="text-[15px] font-bold" />
            </div>
          </div>

          <div className="mb-6 h-[42px] flex items-center">
            {isLoading ? (
              <div className={`h-10 w-24 rounded-lg animate-pulse ${card.isActive ? "bg-white/20" : "bg-gray-200"}`}></div>
            ) : (
              <h1 className="text-[42px] font-bold leading-none">{card.value}</h1>
            )}
          </div>

          <div className={`flex items-center gap-1.5 text-[11px] font-medium ${card.isActive ? "text-green-100/90" : "text-gray-400"}`}>
            <div className={`px-1.5 py-0.5 rounded flex items-center gap-1 ${card.isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {card.subIcon}
            </div>
            <div className="text-[#0c9664]">
                {card.subText}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;