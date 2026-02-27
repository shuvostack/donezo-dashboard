import { FiSearch, FiMail, FiBell } from "react-icons/fi";

const TopBar = () => {
  return (
    <div className="h-[88px] flex items-center justify-between px-10 bg-[#F4F7F6]">
      {/* search bar */}
      <div className="relative w-[380px]">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search task"
          className="w-full pl-11 pr-12 py-3 bg-[#EAEFEF] border-none rounded-full focus:outline-none focus:ring-2 focus:ring-[#045544]/20 text-sm text-gray-700 placeholder-gray-400"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-500 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
          ⌘F
        </div>
      </div>

      {/* right side icons */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <FiMail className="text-[20px]" />
          </button>
          <button className="relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <FiBell className="text-[20px]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-[#F4F7F6]"></span>
          </button>
        </div>

        {/* user profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img 
            src="https://i.ibb.co/Z6NGmCbz/Me3.png" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <h4 className="text-sm font-bold text-gray-900 leading-none mb-1">Mehedi Hasan Shuvo</h4>
            <p className="text-[12px] text-gray-500 leading-none">shuvostack@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;