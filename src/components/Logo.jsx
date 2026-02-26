import React from "react";

const Logo = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-[5px] border-[#045544] flex items-center justify-center">
          <div className="w-3 h-3 bg-[#045544] rounded-full"></div>
        </div>
        <span className="text-2xl font-bold text-gray-900">Donezo</span>
      </div>
    </div>
  );
};

export default Logo;
