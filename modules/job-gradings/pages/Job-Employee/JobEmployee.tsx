import { ArchiveBook, Calendar, Document, Edit, Trash } from "iconsax-reactjs";
import { AppPagination } from "@hrbox/uikit/components";
import { useState } from "react";
import { JD_DATA } from "@hrbox/modules/job-gradings/app/mock";

const JobEmployee = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 30;


    const totalItems = JD_DATA.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = JD_DATA.slice(startIndex, endIndex);


    const meta = {
        page: currentPage,
        totalPages,
        pageSize,
        total: totalItems,
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="flex w-full h-full flex-col">
            {/* cards */}
            <div className="flex flex-row flex-wrap gap-3">
                {paginatedData.map((item) => (
                    <div
                        key={item.id}
                        className="w-[16%] h-[18%] bg-white dark:bg-info-1000 shadow-sm py-4 flex flex-col gap-[6%] rounded-lg"
                    >
                        {/* header */}
                        <div className="w-[full] border-b border-neutral-200 flex flex-row justify-between mx-[5%] ">
                            <div className="w-full flex flex-row items-center gap-2 pb-1.5">
                                <ArchiveBook className="w-4 h-4 " />
                                <p className="text-secondary-1000 font-sans text-md font-semibold">
                                    {item.title}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Edit className="w-5 h-5 cursor-pointer" />
                                <Trash className="w-5 h-5 cursor-pointer" />
                            </div>
                        </div>

                        {/* number of employees */}
                        <div className="w-full flex flex-row items-center px-3 justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#292D32]" />
                                <p className="text-gray-600 text-sm">{item.title2}</p>
                            </div>

                            <span className="text-secondary-1000 text-sm font-medium">
                {item.number}
              </span>
                        </div>

                        {/* status */}
                        <div className="w-full flex flex-row items-center px-3 justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <Document className="w-4 h-4 text-[#292D32]" />
                                <p className="text-gray-600 text-sm">{item.title3}</p>
                            </div>

                            <div
                                className="px-2.5 py-0.5 rounded-lg flex justify-center items-center"
                                style={{
                                    backgroundColor: item.color || "#e5e7eb",
                                }}
                            >
                <span className="text-xs text-secondary-1000 font-medium">
                  {item.Grade}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* pagination */}
            <div className="flex w-full justify-end mt-4">
                <AppPagination  meta={meta} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};

export default JobEmployee;
