import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { AppPagination } from "@hrbox/UIKit/components";

const AllProjects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginateData = {
    data: [
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Inprogress",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Done",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
      {
        title: "Payrol",
        status: "Back log",
        startDate: "Start 2025/01/01",
        timeLeft: "11:40 Left",
        progressValue: "5%",
      },
    ],
    meta: {
      page: currentPage,
      totalPages: 10,
      pageSize: 10,
      total: 100,
    },
  };
  const handlePage = (page: any) => {
    setCurrentPage(page);
  };
  return (
    <>
    <div className="flex flex-col items-end justify-between h-full">
      <div className="grid grid-cols-5 gap-3 w-full ">
        {paginateData.data.map((item,index)=>(
        <ProjectCard
        key={index}
          title={item.title}
          status={item.status}
          startDate={item.startDate}
          timeLeft={item.timeLeft}
          progressValue={item.progressValue}
        />
        ))}
      </div>
        <AppPagination meta={paginateData.meta} onPageChange={handlePage} />
      </div>
    </>
  );
};

export default AllProjects;
