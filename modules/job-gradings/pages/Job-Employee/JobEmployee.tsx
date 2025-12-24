import {JD} from "@hrbox/modules/job-gradings/app/mock";
import {ArchiveBook, Calendar, Document} from "iconsax-reactjs";

const JobEmployee = () => {
    return (
        <div className="w-full bg-primary-1000 h-full flex flex-row flex-wrap px-3 py-4 gap-5 justify-center">
            {JD.map((item) => (
                <div
                    key={item.id}
                    className="  bg-white dark:bg-info-1000 shadow-sm  flex flex-col gap-2 rounded-lg"
                >

                    <div className="w-full justify-center flex flex-col px-3">
                        <div className="w-full flex flex-row items-center gap-2 pb-1.5">
                            <ArchiveBook className="w-4 h-4 text-[#0A9AD7]" />
                            <p className="text-secondary-1000 font-sans text-md font-semibold">
                                {item.title}
                            </p>
                        </div>
                        <hr className="w-full border-neutral-200" />
                    </div>


                    <div className="w-full flex flex-row items-center px-3 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <p className="text-gray-600 text-sm">{item.title2}</p>
                        </div>
                        <span className="text-secondary-1000 text-sm font-medium">
                {item.number}
              </span>
                    </div>


                    <div className="w-full flex flex-row items-center px-3 justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Document className="w-4 h-4 text-gray-500" />
                            <p className="text-gray-600 text-sm">{item.title3}</p>
                        </div>

                        <div
                            className="px-2.5 py-0.5 rounded-lg flex justify-center items-center rounded"
                            style={{
                                backgroundColor: item.color || "#e5e7eb",
                            }}
                        >
                <span className="text-xs  text-secondary-1000 font-medium">
                  {item.Grade}
                </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobEmployee;
