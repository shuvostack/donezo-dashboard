import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const TeamCollaboration = () => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://task-api-eight-flax.vercel.app/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data) {
          setUsersData(response.data.users);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getBadgeStyle = (status) => {
    if (status === "active") {
        return "bg-green-100 text-green-600 border border-green-200";
    }
    return "bg-red-100 text-red-500 border border-red-200";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      className="lg:col-span-2 bg-white rounded-[24px] p-7 shadow-sm border border-gray-100"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 text-[17px]">Team Collaboration</h3>
        <button className="text-[#045544] border border-gray-200 px-4 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1 hover:border-[#045544] transition-colors">
          + Add Member
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="text-sm text-gray-400 text-center py-4">Loading team data...</div>
        ) : (
          usersData.slice(0, 4).map((user, index) => (
            <div key={user.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <img 
                  src={`https://i.pravatar.cc/150?img=${index + 10}`} 
                  alt={user.name} 
                  className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                />
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 leading-tight mb-0.5">{user.name}</h4>
                  <p className="text-[11px] font-medium text-gray-400">
                     <span className="font-bold text-gray-700">{user.email}</span>
                  </p>
                </div>
              </div>
              <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold capitalize ${getBadgeStyle(user.status)}`}>
                {user.status}
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TeamCollaboration;