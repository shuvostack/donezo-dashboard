import { FiGrid, FiCheckSquare, FiCalendar, FiBarChart2, FiUsers, FiSettings, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-[260px] bg-[#F4F7F6] h-screen flex flex-col justify-between py-8 sticky top-0 shadow-[2px_0_8px_rgba(0,0,0,0.02)] mt-5 ml-4 rounded-2xl">
      <div>
        {/* logo */}
        <div className="px-8 mb-12 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-[4px] border-[#045544] flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-[#045544] rounded-full"></div>
          </div>
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">Donezo</span>
        </div>

        {/* menu */}
        <div className="mb-8">
          <p className="px-8 text-[10px] font-bold text-gray-400 mb-4 tracking-wider uppercase">Menu</p>
          <nav className="flex flex-col gap-2">
            {/* active items */}
            <div className="relative flex items-center justify-between px-8 py-2 text-[#045544] cursor-pointer">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-[#045544] rounded-r-full"></div>
              <div className="flex items-center gap-3 font-bold text-[15px]">
                <FiGrid className="text-[18px]" /> Dashboard
              </div>
            </div>
            {/* inactive items */}
            <div className="flex items-center justify-between px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]">
                <FiCheckSquare className="text-[18px]" /> Tasks
              </div>
              <span className="bg-[#045544] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">12+</span>
            </div>
            <div className="flex items-center px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiCalendar className="text-[18px]" /> Calendar</div>
            </div>
            <div className="flex items-center px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiBarChart2 className="text-[18px]" /> Analytics</div>
            </div>
            <div className="flex items-center px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiUsers className="text-[18px]" /> Team</div>
            </div>
          </nav>
        </div>

        {/* general items */}
        <div>
          <p className="px-8 text-[10px] font-bold text-gray-400 mb-4 tracking-wider uppercase">General</p>
          <nav className="flex flex-col gap-2">
            <div className="flex items-center px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiSettings className="text-[18px]" /> Settings</div>
            </div>
            <div className="flex items-center px-8 py-2 text-gray-400 hover:text-gray-900 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiHelpCircle className="text-[18px]" /> Help</div>
            </div>
            <div onClick={handleLogout} className="flex items-center px-8 py-2 text-gray-400 hover:text-red-600 cursor-pointer transition-colors">
              <div className="flex items-center gap-3 font-medium text-[15px]"><FiLogOut className="text-[18px]" /> Logout</div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;