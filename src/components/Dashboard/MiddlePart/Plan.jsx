import { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const Plan = () => {
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://task-api-eight-flax.vercel.app/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) setProductsData(response.data.products);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const colors = ["bg-blue-500", "bg-teal-500", "bg-yellow-400", "bg-orange-500"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-[16px]">Plan</h3>
        <button className="text-[#045544] border border-gray-200 px-3 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 hover:border-[#045544] transition-colors cursor-pointer">
          <FiPlus /> New
        </button>
      </div>

      <div className="flex flex-col gap-5 flex-1 justify-between">
        {isLoading ? (
           <div className="text-sm text-gray-400 text-center py-4">Loading data...</div>
        ) : (
          productsData.slice(0, 4).map((product, index) => (
            <div key={product.id} className="flex items-center gap-4">
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
  );
};

export default Plan;