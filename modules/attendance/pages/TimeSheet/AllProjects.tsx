import { CardBody, CircularProgress, Progress } from "@heroui/react";
import { ClipboardTick, Status, Timer, Timer1 } from "iconsax-reactjs";
import ProjectCard from "./ProjectCard";

const AllProjects = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-3 ">
      <ProjectCard title="Payrol" status="Back log" startDate="Start 2025/01/01" timeLeft="11:40 Left" progressValue="5%" />
      </div>
    </>
  );
};

export default AllProjects;
