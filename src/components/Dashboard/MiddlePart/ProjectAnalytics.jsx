import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ProjectAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://task-api-eight-flax.vercel.app/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) setAnalyticsData(response.data.analytics);
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

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-white rounded-[24px] p-5 sm:p-7 shadow-sm border border-gray-100 h-[280px]"
      >
        <h3 className="font-bold text-gray-900 mb-6 text-[17px]">Project Analytics</h3>
        
        <div className="h-[180px] flex items-end justify-between px-1 md:px-2 pb-2 relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Loading chart...</div>
          ) : (
            chartBars.map((bar, i) => (
              <div key={i} className="flex flex-col items-center justify-end h-full gap-2 md:gap-3 group relative">
                
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
                  className={`w-7 sm:w-9 md:w-11 rounded-full transition-all duration-500 hover:scale-[1.03] cursor-pointer ${
                    bar.isStriped ? "border-2 border-gray-300" : "shadow-sm"
                  }`}
                ></div>
                
                {/* x-axis label */}
                <span className="text-[11px] md:text-[13px] font-bold text-gray-400 uppercase tracking-wide">{bar.day}</span>
              </div>
            ))
          )}
        </div>
      </motion.div>
  );
};

export default ProjectAnalytics;