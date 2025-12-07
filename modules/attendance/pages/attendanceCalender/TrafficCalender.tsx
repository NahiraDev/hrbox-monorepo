import { Add, Edit, Trash } from "iconsax-reactjs";
import { AppButton } from "@hrbox/uikit/components";
import Comprehensivereport from "@hrbox/modules/attendance/pages/attendanceCalender/Comprehensivereport";
import React, { useRef, useState } from "react";

const TrafficCalender = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuStyle, setMenuStyle] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
  });
  const [IsReportHidden, setIsReportHidden] = useState<boolean>(false);

  const toggleMenu = (rowindex: number, cellType: string) => {
    const key = `${rowindex}-${cellType}`;
    if (openMenu === key) {
      setOpenMenu(null);
    } else {
      setOpenMenu(key);
      const element = cellRefs.current[key];
      if (element) {
        const rect = element.getBoundingClientRect();
        const isShift = key.includes("shift");
        const offset = 5;
        const menuHeight = isShift ? 170 : 140;
        const viewportHeight = window.innerHeight;
        if (rect.bottom + offset + menuHeight > viewportHeight) {
          setMenuStyle({
            top: `${rect.top - menuHeight - offset}px`,
            left: `${rect.left}px`,
          });
        } else {
          setMenuStyle({
            top: `${rect.bottom + offset}px`,
            left: `${rect.left}px`,
          });
        }
      }
    }
  };

  return (
    <>
      <div
        className={`${IsReportHidden ? "h-full w-full" : "flex flex-row gap-3 h-full w-full"}`}
      >
        {!IsReportHidden && (
          <div className="w-[80%] border border-primary rounded-xl py-4 px-3">
            {/* start table */}
            <div className="w-full flex flex-col h-full ">
              {/* start Header */}
              <div className="grid grid-cols-12 gap-2 text-white text-sm ">
                <div className="bg-[#999999] px-2 py-3 rounded-lg w-full col-span-2">
                  <p>Date</p>
                </div>
                <div className="bg-[#999999] px-2 py-3 rounded-lg col-span-1">
                  <p>Shift</p>
                </div>
                <div className="grid col-span-7 grid-cols-7 bg-primary rounded-lg w-full gap-2.5">
                  <div className="px-2 py-3 w-full">
                    <p>Check in</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>Check out</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>Presence</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>Overdue</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>Delay</p>
                  </div>
                  <div className="px-2 py-3 w-full col-span-2">
                    <p>Haste to leave</p>
                  </div>
                </div>
                <div className="px-2 py-3 w-full bg-success rounded-lg col-span-2">
                  <p>Request</p>
                </div>
              </div>
              {/* end Header */}

              {/* start Rows */}
              <div className="grid w-full gap-1 overflow-y-scroll h-full custom-scroll-table">
                {/* start row */}
                <div className="rounded-md">
                  <div className="grid grid-cols-12 gap-2 w-full text-xs text-[#1E3363] dark:text-[#DEE1E8] items-center text-center hover:bg-[#DCF0F9] dark:hover:bg-[#04425C60] rounded-md ">
                    <div
                      ref={(el) => {
                        if (el) cellRefs.current[`0-date`] = el;
                      }}
                      className="col-span-2 p-1 border-b-1 border-white dark:border-[#01101A] items-center text-start! relative cursor-pointer"
                      onClick={() => toggleMenu(0, "date")}
                    >
                      <p>11/02/2025</p>
                      <p>Wednesday (Present)</p>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) cellRefs.current[`0-shift`] = el;
                      }}
                      className="col-span-1 px-2 py-3 border-b-1 border-white dark:border-[#01101A] items-center cursor-pointer"
                      onClick={() => toggleMenu(0, "shift")}
                    >
                      <p>12354</p>
                    </div>
                    <div className="grid grid-cols-7 col-span-7 border-b-1 border-white dark:border-[#01101A] items-center">
                      <div className="px-2 py-3">
                        <p>09:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>17:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>08:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>01:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>00:00</p>
                      </div>
                      <div className="px-2 py-3 col-span-2 text-center">
                        <p>00:00</p>
                      </div>
                    </div>
                    <div className="col-span-2 px-2 py-3 h-full border-b-1 border-white dark:border-[#01101A]">
                      <p>-</p>
                    </div>
                  </div>
                </div>
                {/* end row */}
              </div>
              {/* end Rows */}
            </div>
            {/* end table */}
          </div>
        )}
        {/* start menu button */}
        {openMenu && (
          <div
            className="fixed px-4 py-2 bg-white rounded-md z-50 shadow-lg"
            style={{
              top: menuStyle.top,
              left: menuStyle.left,
            }}
            onClick={() => setOpenMenu(null)}
          >
            <div className="flex flex-col items-start gap-1.5">
              {openMenu.includes("shift") ? (
                <React.Fragment key="shift-menu">
                  <AppButton
                    content="Daily Leave"
                    startContent={<Add size={18} />}
                    className="gap-1.5 text-sm text-white bg-[#01101A]"
                    size=""
                    key="Daily_Leave"
                  />
                  <AppButton
                    content="Daily Mission"
                    startContent={<Add size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    size=""
                    key="Daily_Mission"
                  />
                  <AppButton
                    content="Edit Traffic Entry"
                    startContent={<Edit size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    key="Edit_Traffic_Entry"
                    size=""
                  />
                  <AppButton
                    content="Delete Request"
                    startContent={<Trash size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    size=""
                    key="Delete_Request"
                  />
                </React.Fragment>
              ) : (
                <React.Fragment key="date-menu">
                  <AppButton
                    content="Daily Leave"
                    startContent={<Add size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    key="Daily_Leave"
                    size=""
                  />
                  <AppButton
                    content="Daily Mission"
                    startContent={<Add size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    size=""
                    key="Daily_Mission"
                  />
                  <AppButton
                    content="Delete Request"
                    startContent={<Trash size={18} />}
                    className="gap-1.5 text-sm bg-[#01101A]"
                    size=""
                    key="Delete_Request"
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        )}
        {/* end menu button */}
        <Comprehensivereport
          isExpanded={IsReportHidden}
          onToggle={() => setIsReportHidden(!IsReportHidden)}
        />
      </div>
    </>
  );
};

export default TrafficCalender;