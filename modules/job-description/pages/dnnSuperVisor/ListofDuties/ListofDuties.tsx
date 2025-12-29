import {
  Briefcase,
  ChartCircle,
  ProfileAdd,
  UserOctagon,
} from "iconsax-reactjs";
import { useSelector } from "react-redux";
import { RootState } from "@hrbox/core/redux";
import { useEffect, useState } from "react";
import { AppTable, FormField } from "@hrbox/uikit/components";
import { duties } from "../../../app/mock";
import FormDuties from "../../../forms/FormDuties";

const ListofDuties = () => {
  const isEditMode = useSelector(
    (state: RootState) => state.dnnSupervisorEdit.isEditMode
  );
  const [editTable, setEditTable] = useState<boolean>(false);
  useEffect(() => {
    setEditTable(isEditMode);
  }, [isEditMode]);
  return (
    <>
      <div className="flex flex-col w-full h-full">
        {/* header content */}
        <div className="flex pt-3 pr-[124px] pb-4 pl-6 bg-[#DCF0F9] dark:bg-[#04425C] rounded-t-xl">
          <div className="flex flex-row gap-[114px]">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5 dark:text-[#DEE1E8]!">
                  <span>
                    <Briefcase size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Job Title:
                    <span className="font-bold" contentEditable={editTable}>
                      {" "}
                      HR Specialist
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <UserOctagon size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Supervisor:
                    <span className="font-bold" contentEditable={editTable}>
                      {" "}
                      CEO
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <ProfileAdd size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Positions Needed:
                    <span className="font-bold" contentEditable={editTable}>
                      {" "}
                      1
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-row p-2">
                <div className="flex flex-row gap-1.5">
                  <span>
                    <ChartCircle size={24} color="#1E3363" />
                  </span>
                  <p className="text-xl text-[#1E3363]">
                    Recruitment Process Management:
                    <span className="font-bold"> Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header content */}
        <div className="w-full h-full pr-3 py-3 ">
          <div className="w-full max-h-[561px] flex flex-col p-4 gap-4 overflow-y-auto custom-scroll-objectives">
            {editTable && <FormDuties />}
            <AppTable data={duties} hasPagination={false} variant="default" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListofDuties;
