const Dashboard = () => {
    
  return (
    <>
      <div className="w-full   flex flex-row gap-x-4 h-full ">
        <div className="left flex flex-col  w-full ">
          <div className="top h-full   flex gap-x-4">
            {/* progressBar */}
            <div className="Progressbar flex flex-col w-130 h-inherit bg-[#DCF0F9] border-primary border rounded-xl">
              <div className="top w-full h-[20%]  py-4 pl-2.25 pr-3.75  ">
                <p className="text-[#04070E] font-sans text-[24px] font-semibold text-capitalize  ">
                  Progress status of projects
                </p>
                <hr className="w-full border-[#05587A]" />
              </div>
            </div>
            <div className="w-[70%] flex flex-col border-primary border rounded-xl px-3 py-4 bg-[#DCF0F9]  ">
              <div className="w-full pb-2.5">
                <p className="text-[#04070E] font-sans text-[24px]  font-semibold text-capitalize  ">
                  The state of the organization
                </p>
              </div>
              <hr className="w-full border-[#05587A]" />
              <div className="flex flex-col gap-3 pt-4 w-full items-center h-full">
                <div className="bg-[#FFFFFF] py-3 px-3 flex flex-col rounded-xl w-full ">
                  <div className="flex w-full justify-between items-center">
                    <p className="text-[#04070E] font-sans text-[20px]  font-semibold text-capitalize  ">
                      Number of jobs graded
                    </p>
                    <span className="text-[32px] text-[#1E3363] font-bold font-sans">
                      28
                    </span>
                  </div>
                  <hr className="w-full border-[#B2B2B2]" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[50%] bg-amber-500">
            <div className="h-inherit w-50 bg-red-400"></div>
          </div>
        </div>
        <div className="right  bg-primary w-88"></div>
      </div>
    </>
  );
};

export default Dashboard;
