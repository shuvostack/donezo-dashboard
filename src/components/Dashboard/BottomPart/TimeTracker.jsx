import { useEffect } from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import { motion } from "framer-motion";
import { useStopwatch } from "react-timer-hook";

const TimeTracker = () => {

  const getSavedSeconds = () => {
    const saved = localStorage.getItem("tracker_seconds");
    return saved !== null ? parseInt(saved, 10) : 2048;
  };

  const getSavedState = () => {
    return localStorage.getItem("tracker_running") === "true";
  };

  // offset time 
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + getSavedSeconds());

  const {
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ 
    autoStart: getSavedState(), 
    offsetTimestamp: stopwatchOffset 
  });

  // save data to localstorage
  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    localStorage.setItem("tracker_seconds", totalSeconds.toString());
    localStorage.setItem("tracker_running", isRunning.toString());
  }, [seconds, minutes, hours, isRunning]);

  // time format
  const formatTime = (h, m, s) => {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };


  const handleReset = () => {
    const zeroOffset = new Date();
    reset(zeroOffset, false); 
    // reset count
    localStorage.setItem("tracker_seconds", "0");
    localStorage.setItem("tracker_running", "false");
  };

  const toggleTimer = () => {
    if (isRunning) pause();
    else start();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
      className="lg:col-span-1 bg-gradient-to-br from-[#023b2e] via-[#045544] to-[#0c9664] rounded-[24px] p-7 text-white shadow-sm relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0bd993] opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 shadow-[0_0_20px_10px_rgba(255,255,255,0.05)] rotate-12"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 shadow-[0_0_20px_10px_rgba(255,255,255,0.05)] -rotate-12"></div>

      <div className="relative z-10">
        <h3 className="font-semibold text-green-50 mb-6 text-[15px]">Time Tracker</h3>
        
        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-[42px] font-bold tracking-wider leading-none mb-8 font-mono">
            {formatTime(hours, minutes, seconds)}
          </h1>
          
          <div className="flex items-center gap-4">
            {/* play and pause Btn */}
            <button 
              onClick={toggleTimer}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#045544] hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              {isRunning ? <FiPause className="text-xl font-bold" /> : <FiPlay className="text-xl font-bold ml-1" />}
            </button>
            
            {/* stop and reset btn */}
            <button 
              onClick={handleReset}
              className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeTracker;