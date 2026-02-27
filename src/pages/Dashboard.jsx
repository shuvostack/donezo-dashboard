import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import StatsCards from "../components/StatsCards";
import MiddleSection from "../components/MiddleSection";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="">
          <TopBar />
        </div>

        <div className="px-10 py-8 overflow-y-auto bg-[#F4F7F6] ml-4 mr-4 rounded-2xl">
          {/* title and btn */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-[32px] font-bold text-gray-900 tracking-tight mb-1">Dashboard</h1>
              <p className="text-gray-500 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gradient-to-bl from-[#023b2e] via-[#045544] to-[#0c9664] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
                <span>+</span> Add Project
              </button>
              <button className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                Import Data
              </button>
            </div>
          </div>

          <StatsCards></StatsCards>
          <MiddleSection></MiddleSection>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;