import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProjectProgress = () => {
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(41);   
      setInProgress(70);  
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const halfCirclePath = "M 10 100 A 90 90 0 0 1 190 100";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-[24px] p-7 shadow-sm border border-gray-100 flex flex-col items-center h-full"
    >
      <h3 className="font-bold text-gray-900 text-[17px] w-full text-left mb-6">Project Progress</h3>
      
      <div className="relative w-48 h-24 mb-6">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <pattern id="stripes" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
              <line x1="0" y="0" x2="0" y2="4" stroke="#cbd5e1" strokeWidth="2" />
            </pattern>
          </defs>
          <path d={halfCirclePath} fill="none" stroke="url(#stripes)" strokeWidth="20" strokeLinecap="round" />
          
          {/* in progress */}
          <motion.path 
            d={halfCirclePath} 
            fill="none" 
            stroke="#045544" 
            strokeWidth="20" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inProgress / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* completed */}
          <motion.path 
            d={halfCirclePath} 
            fill="none" 
            stroke="#0bd993" 
            strokeWidth="20" 
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: completed / 100 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center justify-end">
          <h1 className="text-[40px] font-extrabold text-gray-900 leading-none">
            {completed}%
          </h1>
          <p className="text-[10px] font-bold text-gray-400">Project Ended</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 mt-auto w-full justify-center">
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[#0bd993]"></div> Completed</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[#045544]"></div> Progress</div>
        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-full bg-[repeating-linear-gradient(-45deg,transparent,transparent_2px,#cbd5e1_2px,#cbd5e1_4px)]"></div> Pending</div>
      </div>
    </motion.div>
  );
};

export default ProjectProgress;