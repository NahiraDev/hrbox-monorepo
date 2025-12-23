import { jobDescriptions } from "@hrbox/modules/job-description/app/mock";
import { AppPagination } from "@hrbox/uikit/components";
import { useState } from "react";
import JobDescriptionCard from "./JobDescriptionCard";
const Jobdescription = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const paginateData = {
    data: jobDescriptions.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ),
    meta: {
      page: currentPage,
      totalPages: Math.ceil(jobDescriptions.length / pageSize),
      pageSize: pageSize,
      total: jobDescriptions.length,
    },
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div className="flex flex-col justify-between h-full items-end">
        <div className="flex flex-row flex-wrap gap-3 ">
          {jobDescriptions.map((item) => (
            <JobDescriptionCard
              key={item.id}
              title={item.title}
              correctionDate={item.correctionDate}
              positionCode={item.positionCode}
            />
          ))}
        </div>
        <AppPagination meta={paginateData.meta} onPageChange={handlePage} />
      </div>
    </>
  );
};

export default Jobdescription;
