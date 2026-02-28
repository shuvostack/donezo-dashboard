import { FiVideo } from "react-icons/fi";
import { motion } from "framer-motion";

const Reminders = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-1 bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 flex flex-col justify-between h-[280px]"
      >
        <div>
          <h3 className="font-semibold text-gray-900 mb-5 text-[16px]">Reminders</h3>
          <h2 className="text-[24px] font-bold text-[#045544] leading-snug mb-2">Meeting with Arc Company</h2>
          <p className="text-[12px] font-medium text-gray-400 mb-6 tracking-wide">Time : 02.00 pm - 04.00 pm</p>
        </div>
        <button className="w-full bg-gradient-to-br from-[#023b2e] via-[#045544] to-[#0c9664] text-white py-4 rounded-full flex items-center justify-center gap-2 text-[15px] font-medium transition-all shadow-md cursor-pointer">
          <FiVideo className="text-xl" /> Start Meeting
        </button>
      </motion.div>
  );
};

export default Reminders;