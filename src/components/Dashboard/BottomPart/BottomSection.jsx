import ProjectProgress from "./ProjectProgress";
import TeamCollaboration from "./TeamCollaboration";
import TimeTracker from "./TimeTracker";

const BottomSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 pb-10">
      <TeamCollaboration></TeamCollaboration>
      <ProjectProgress></ProjectProgress>
      <TimeTracker></TimeTracker>
    </div>
  );
};

export default BottomSection;