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
                <hr className="w-full border-[#05587A]"  />
              </div>
            </div>
          </div>
          <div className="flex h-[50%] bg-amber-500">
            <div className="h-inherit w-50 bg-red-400"></div>
          </div>
        </div>
        <div className="right bg-primary w-88"></div>
      </div>
    </>
  );
};

export default Dashboard;
