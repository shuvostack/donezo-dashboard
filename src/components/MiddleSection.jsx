import { useState, useEffect } from "react";
import axios from "axios";
import { FiVideo, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const MiddleSection = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://task-api-eight-flax.vercel.app/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setAnalyticsData(response.data.analytics);
          setProductsData(response.data.products);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  
  const maxViews = analyticsData.length > 0 ? Math.max(...analyticsData.map(d => d.views)) : 2000;
  
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const chartBars = days.map((day, index) => {
    const isStriped = index === 0 || index === 4 || index === 5 || index === 6;
    let bgColor = "transparent";
    if (index === 1) bgColor = "#049673"; 
    if (index === 2) bgColor = "#0bd993"; 
    if (index === 3) bgColor = "#045544"; 

    const apiItem = analyticsData[index - 1]; 
    const heightPercent = apiItem ? (apiItem.views / maxViews) * 100 : (Math.random() * 40 + 40); 

    return { day, heightPercent, isStriped, bgColor, views: apiItem?.views || 0 };
  });

  // dummy color for Plan section
  const colors = ["bg-blue-500", "bg-teal-500", "bg-yellow-400", "bg-orange-500"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      
      {/* project analytics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-white rounded-[24px] p-7 shadow-sm border border-gray-100"
      >
        <h3 className="font-bold text-gray-900 mb-6 text-[17px]">Project Analytics</h3>
        
        <div className="h-[220px] flex items-end justify-between px-2 pb-2 relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Loading chart...</div>
          ) : (
            chartBars.map((bar, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full gap-3 group relative w-12">
                
                {/* Tooltip */}
                {!bar.isStriped && (
                  <div className="absolute -top-8 bg-white border border-gray-100 shadow-sm text-[10px] font-bold text-gray-600 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {Math.round(bar.heightPercent)}%
                  </div>
                )}
                
                {/* Bar */}
                <div 
                  style={{ 
                    height: `${bar.heightPercent}%`,
                    backgroundColor: bar.bgColor,
                    backgroundImage: bar.isStriped ? 'repeating-linear-gradient(-45deg, transparent, transparent 3px, #cbd5e1 3px, #cbd5e1 5px)' : 'none'
                  }}
                  className={`w-11 rounded-full transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
                    bar.isStriped ? "border-2 border-gray-300" : "shadow-sm"
                  }`}
                ></div>
                
                {/* x-axis label */}
                <span className="text-[13px] font-bold text-gray-400 uppercase tracking-wide">{bar.day}</span>
              </div>
            ))
          )}
        </div>
      </motion.div>

      {/* reminder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-1 bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 flex flex-col justify-between"
      >
        <div>
          <h3 className="font-semibold text-gray-900 mb-5 text-[16px]">Reminders</h3>
          <h2 className="text-[24px] font-bold text-[#045544] leading-snug mb-2">Meeting with Arc Company</h2>
          <p className="text-[12px] font-medium text-gray-400 mb-6 tracking-wide">Time : 02.00 pm - 04.00 pm</p>
        </div>
        <button className="w-full bg-gradient-to-bl from-[#023b2e] via-[#045544] to-[#0c9664] text-white py-4 rounded-full flex items-center justify-center gap-2 text-[15px] font-medium transition-all shadow-md cursor-pointer">
          <FiVideo className="text-xl" /> Start Meeting
        </button>
      </motion.div>

      {/* plan list */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:col-span-1 bg-white rounded-[24px] p-7 shadow-sm border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900 text-[16px]">Plan</h3>
          <button className="text-[#045544] border border-gray-200 px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 hover:border-[#045544] transition-colors">
            <FiPlus /> New
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {isLoading ? (
             <div className="text-sm text-gray-400 text-center py-4">Loading data...</div>
          ) : (
            productsData.slice(0, 4).map((product, index) => (
              <div key={product.id} className="flex items-center gap-4">
                {/* Custom Color*/}
                <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center opacity-90 ${colors[index % 4]}`}>
                  <div className="w-4 h-4 bg-white/30 rounded-full backdrop-blur-sm"></div>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 leading-tight mb-1">{product.name}</h4>
                  <p className="text-[11px] font-medium text-gray-400">Sales: {product.sales} • Price: ${product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>

    </div>
  );
};

export default MiddleSection;