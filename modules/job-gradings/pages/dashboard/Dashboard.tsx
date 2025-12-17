import StateOrganize from "./StateOrganize";
import EmployeeStatus from "./EmployeeStatus";
import { ArchiveBook, Calendar, Document } from "iconsax-reactjs";
//import { Link, MaskLeft, MaskRight } from "iconsax-reactjs";
// import {Elipse2} from "@hrbox/uikit/icons/Elipse2";
const Dashboard = () => {
  const organization = [
    {
      id: "1",
      title: "Number of jobs graded",
      number: "28",
    },
    {
      id: "2",
      title: "Number of employees with grades",
      number: "53",
    },
    {
      id: "3",
      title: "Ungraded jobs",
      number: "12",
    },
    {
      id: "4",
      title: "Unemployed jobs",
      number: "3",
    },
  ];

  return (
    <>
      <div className="w-full   flex flex-row   h-full ">
        <div className="left flex flex-col  w-full gap-y-4 ">
          <div className="top  h-[60%]   flex gap-x-4">
            {/* progressBar */}
            <div className="Progressbar  flex flex-col w-130 h-full bg-[#DCF0F9] border-primary border rounded-xl">
              <div className=" w-full pt-4 pl-2.25 pr-3.75 pb-4   ">
                <div className="w-full pb-2.5">
                  <p className="text-secondary-1000 font-sans text-[24px] font-semibold text-capitalize  ">
                    Progress status of projects
                  </p>
                </div>
                <hr className="w-full border-[#05587A]" />
              </div>
            </div>
            <StateOrganize organization={organization} />
          </div>
          <div className="flex button h-[40%] gap-4   ">
            <EmployeeStatus />
            <div className="w-[60%] bg-[#DCF0F9] border-primary border rounded-xl">
              <div className=" w-full pt-4 pl-2.25 pr-3.75 pb-4   ">
                <div className="w-full pb-2.5">
                  <p className="text-[#04070E] font-sans text-[24px] font-semibold text-capitalize  ">
                    Notifications
                  </p>
                </div>
                <hr className="w-full border-[#05587A]" />
              </div>
              <div className="flex w-full bg-admin-primary-light px-3 ">
                <div className="left flex flex-col gap-3.5 w-[60%]">
                  <div className="flex flex-row w-fit gap-2 ">
                    {/* <Elipse2/> */}
                    <p className="text-secondary-1000 font-semibold text-xl">
                      Job (Product Manager) Unemployed
                    </p>
                  </div>
                  <div className="flex flex-row w-fit gap-2 ">
                    {/* <Elipse2/> */}
                    <p className="text-secondary-1000 font-semibold text-xl">
                      Employed, (Ahmad Rezaei) above job grade
                    </p>
                  </div>
                  <div className="flex flex-row w-fit gap-2 ">
                    {/* <Elipse2/> */}
                    <p className="text-secondary-1000 font-semibold text-xl">
                      Employed (Ahmad Rezaei) below job rank
                    </p>
                  </div>
                </div>
                <div className="left flex flex-col gap-3.5 w-[40%]">
                  {/* <App */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right flex flex-col border-primary bg-[#DCF0F9] rounded-xl w-88">
          <div className=" w-full flex flex-col  px-3 py-3   ">
            <div className="w-full flex flex-row justify-between pb-2.5">
              <p className="text-secondary-1000 font-sans text-2xl font-semibold text-capitalize  ">
                JD List
              </p>
              {/* <AppButton/> */}
            </div>
            <hr className="w-full border-neutral-100" />
          </div>
          <div className="w-full py-4 h-[20%]   flex flex-col items-center  ">
            <div className="w-[90%] bg-white  h-full flex flex-col  shadow-light-tight-1 rounded-lg">
              <div className=" w-full flex flex-col  px-3 py-3   ">
                <div className="w-full flex flex-row items-center gap-1 pb-1  ">
                  <ArchiveBook className="w-5 h-5" />
                  <p className="text-secondary-1000  font-sans text-md font-semibold text-capitalize  ">
                    Designer
                  </p>
                </div>
                <hr className="w-full border-neutral-100" />
              </div>
              <div className=" w-full flex flex-row items-center  px-3 justify-between   ">
                <div className="w-full flex flex-row items-center gap-1 pb-1  ">
                  <Calendar className="w-5 h-5" />
                  <p className="text-secondary-1000  font-sans text-md font-semibold text-capitalize  ">
                    Number of employees:
                  </p>
                </div>
                <span className="text-secondary-1000 text-sm ">1595</span>
              </div>
              <div className=" w-full flex flex-row items-center  px-3 justify-between   ">
                <div className="w-full flex flex-row items-center gap-1   ">
                  <Document className="w-5 h-5" />
                  <p className="text-secondary-1000  font-sans text-md font-semibold text-capitalize  ">
                    Status
                  </p>
                </div>
                <div className="px-2 leading-10  py-1 bg-[#FFCC00] rounded-lg">
                  <span className="text-xs">Grade B</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
