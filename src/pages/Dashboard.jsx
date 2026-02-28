import Sidebar from "../components/Dashboard/BarItems/Sidebar";
import TopBar from "../components/Dashboard/BarItems/TopBar";
import StatsCards from "../components/Dashboard/FirstPart/StatsCards";
import ProjectAnalytics from "../components/Dashboard/MiddlePart/ProjectAnalytics";
import Reminders from "../components/Dashboard/MiddlePart/Reminders";
import ProjectList from "../components/Dashboard/MiddlePart/Plan";
import TeamCollaboration from "../components/Dashboard/BottomPart/TeamCollaboration";
import ProjectProgress from "../components/Dashboard/BottomPart/ProjectProgress";
import TimeTracker from "../components/Dashboard/BottomPart/TimeTracker";
import { useState } from "react";

const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <div>
        <Sidebar isOpen={isSidebarOpen} onCloseSidebar={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <div className="">
          <TopBar onOpenSidebar={() => setIsSidebarOpen(true)} />
        </div>

        <div className="px-4 md:px-10 py-6 md:py-8 overflow-y-auto bg-[#F4F7F6] mx-0 md:ml-4 md:mr-4 mb-0 md:mb-5 rounded-none md:rounded-2xl">
          
          {/* title and btn */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 md:gap-0 mb-8">
            <div>
              <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900 tracking-tight mb-1">Dashboard</h1>
              <p className="text-gray-500 text-sm">Plan, prioritize, and accomplish your tasks with ease.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gradient-to-br from-[#023b2e] via-[#045544] to-[#0c9664] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
                <span>+</span> Add Project
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
                Import Data
              </button>
            </div>
          </div>

          <StatsCards></StatsCards>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            
            <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* row 1 */}
              <div className="lg:col-span-2 [&>div]:h-full">
                <ProjectAnalytics />
              </div>
              <div className="lg:col-span-1 [&>div]:h-full">
                <Reminders />
              </div>

             {/* row 2 */}
              <div className="lg:col-span-2 [&>div]:h-full">
                <TeamCollaboration />
              </div>
              <div className="lg:col-span-1 [&>div]:h-full">
                <ProjectProgress />
              </div>
              
            </div>

            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className="flex-[1.2] [&>div]:h-full">
                <ProjectList />
              </div>
              <div className="flex-[0.8] [&>div]:h-full">
                <TimeTracker />
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;