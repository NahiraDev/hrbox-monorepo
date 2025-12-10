import { AppPagination } from "@hrbox/UIKit/components";
import TimeSheetAccordion from "./TimeSheetAccordion";
import { useState } from "react";

const ProjectTimesheets = () => {
    const [currentPage,setCurrentPage]=useState(1)
  const paginatDate = {
    data: [
      {
        projectName: "Project Name",
        projectTime: "Total project time:",
        time: "11 hours and 40 minutes",
        id: 1,
        taskName: "Task Name",
        name: "Alireza",
        idProject: 1,
        timeProject: "2 hours and 5 minutes",
      },
      {
        projectName: "Project Name",
        projectTime: "Total project time:",
        time: "11 hours and 40 minutes",
        id: 1,
        taskName: "Task Name",
        name: "Alireza",
        idProject: 1,
        timeProject: "2 hours and 5 minutes",
      },
      {
        projectName: "Project Name",
        projectTime: "Total project time:",
        time: "11 hours and 40 minutes",
        id: 1,
        taskName: "Task Name",
        name: "Alireza",
        idProject: 1,
        timeProject: "2 hours and 5 minutes",
      },
    ],
meta: {
      page: currentPage,
      totalPages: 10,
      pageSize: 10,
      total: 100,
    },
  };
  const handlePage=(page:any)=>{
    setCurrentPage(page)
  }
  return (
    <>
      <div className="flex flex-col justify-between h-full items-end">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row justify-between items-center text-white w-full h-10 bg-primary rounded-lg">
            <div className="flex justify-center w-full">
              <p>No</p>
            </div>
            <div className="flex justify-center w-full">
              <p>Task Name</p>
            </div>
            <div className="flex justify-center w-full">
              <p>employee Name</p>
            </div>
            <div className="flex justify-center w-full">
              <p>Time Task</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
          {paginatDate.data.map((item,index)=>(
              <TimeSheetAccordion
              key={index}
              projectName={item.projectName}
              projectTime={item.projectTime}
              time={item.time}
              id={item.id}
              taskName={item.taskName}
              name={item.name}
              idProject={item.idProject}
              timeProject={item.timeProject}
            />
          ))}
          </div>
        </div>
        <AppPagination onPageChange={handlePage} meta={paginatDate.meta} />
      </div>
    </>
  );
};

export default ProjectTimesheets;
