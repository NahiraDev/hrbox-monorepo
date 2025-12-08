import { ReportPersonnal } from "@hrbox/modules/attendance/app/mock";

import { AppButton } from "@hrbox/uikit/components";
import { Add, Edit, Trash } from "iconsax-reactjs";
import React, { useMemo, useRef, useState } from "react";
import { useFormContext } from "@hrbox/core/providers/FormProvider";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

const PersonalCalenderList = () => {
  const [openpopover,setOpenpopover]=useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuStyle, setMenuStyle] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
  });

  const { values } = useFormContext();

  const month = values.month || "";
  const year = values.year || "";
  const person = values.person || "";
  const department = values.department || "";

  const parsePersianDate = (
    dateString: string
  ): { month: string; year: string } => {
    const parts = dateString.match(/\d+/g);

    if (!parts || parts.length < 3) {
      console.warn(`Invalid date format: ${dateString}`);
      return { month: "", year: "" };
    }

    const parsedMonth = parts[1];
    const parsedYear = parts[2];

    const monthPadded = String(parsedMonth).padStart(2, "0");

    return {
      month: monthPadded,
      year: parsedYear,
    };
  };

  const filteredData = useMemo(() => {
    console.log("🔄 Filtering with:", { month, year, person, department });

    const filtered = ReportPersonnal.filter((record) => {
      const { month: recordMonth, year: recordYear } = parsePersianDate(
        record.date
      );

      console.log(
        `📋 Record: ${record.date} → month: ${recordMonth}, year: ${recordYear}`
      );

      const matchMonth = !month || recordMonth === month;
      const matchYear = !year || recordYear === year;
      const matchPerson = !person || record.person === person;
      const matchDepartment = !department || record.department === department;

      console.log(
        `   Match: month=${matchMonth}, year=${matchYear}, person=${matchPerson}, dept=${matchDepartment}`
      );

      return matchMonth && matchYear && matchPerson && matchDepartment;
    });

    console.log("✅ Filtered results:", filtered.length, "records");
    return filtered;
  }, [month, year, person, department]);

  const toggleMenu = (
    rowindex: number,
    cellType: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
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
          <div className="grid w-full gap-1 overflow-y-scroll  h-full custom-scroll-table">
            {/* start row */}
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((record, index) => (
                <div
                  className="rounded-md"
                  key={`${record.date}-${record.person}-${index}`}
                >
                  <div className="grid grid-cols-12 gap-2 w-full text-xs text-[#1E3363] dark:text-[#DEE1E8] items-center text-center hover:bg-[#DCF0F9] dark:hover:bg-[#04425C60] rounded-md ">
                    <div
                      ref={(el) => {
                        if (el) cellRefs.current[`${index}-date`] = el;
                      }}
                      className="col-span-2 p-1 border-b-1 border-white dark:border-[#01101A] items-center text-start! relative cursor-pointer"
                      onContextMenu={(e) => toggleMenu(index, "date", e)}
                    >
                      <p>{record.date}</p>
                      <p>Wednesday (Present)</p>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) cellRefs.current[`${index}-shift`] = el;
                      }}
                      className="col-span-1 px-2 py-3 border-b-1 border-white dark:border-[#01101A] items-center cursor-pointer"
                      onContextMenu={(e) => toggleMenu(index, "shift", e)}
                      onMouseEnter={() => setOpenpopover(`${index}-shift`)}
                      onMouseLeave={() => setOpenpopover(null)}
                    >
                      <Popover placement="top" showArrow={true} isOpen={openpopover===`${index}-shift`}>
                        <PopoverTrigger>
                      <p>{record.shift}</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-7 col-span-7 border-b-1 border-white dark:border-[#01101A] items-center">
                      <div className="px-2 py-3" 
                      onMouseEnter={() => setOpenpopover(`${index}-checkin`)}
                      onMouseLeave={() => setOpenpopover(null)}
                      >
                        <Popover placement="top" showArrow={true} isOpen={openpopover===`${index}-checkin`}>
                        <PopoverTrigger>
                        <p>{record.checkIn}</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                      </div>
                      <div className="px-2 py-3"
                      onMouseEnter={() => setOpenpopover(`${index}-checkout`)}
                      onMouseLeave={() => setOpenpopover(null)}
                      >
                        <Popover placement="top" showArrow={true} isOpen={openpopover===`${index}-checkout`}>
                        <PopoverTrigger>
                        <p>{record.checkOut}</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                      </div>
                      <div className="px-2 py-3">
                        <p>{record.presence}</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>{record.overTime}</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>{record.delay}</p>
                      </div>
                      <div className="px-2 py-3 col-span-2 text-center">
                        <p>{record.earlyLeave}</p>
                      </div>
                    </div>
                    <div className="col-span-2 px-2 py-3 h-full border-b-1 border-white dark:border-[#01101A]">
                      <p>{record.request || ""}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center py-8">
                <p className="text-[#999999]">
                  No records found for {year && `year ${year}`}{" "}
                  {month && `month ${month}`}
                </p>
              </div>
            )}
            {/* end row */}
          </div>
          {/* end Rows */}
        </div>
        {/* end table */}
      </div>
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
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Daily_Leave"
                />
                <AppButton
                  content="Daily Mission"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Daily_Mission"
                />
                <AppButton
                  content="Edit Traffic Entry"
                  startContent={<Edit size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  key="Edit_Traffic_Entry"
                  size=""
                />
                <AppButton
                  content="Delete Request"
                  startContent={<Trash size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Delete_Request"
                />
              </React.Fragment>
            ) : (
              <React.Fragment key="date-menu dark:bg-[#01101A]!">
                <AppButton
                  content="Daily Leave"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  key="Daily_Leave"
                  size=""
                />
                <AppButton
                  content="Daily Mission"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Daily_Mission"
                />
                <AppButton
                  content="Delete Request"
                  startContent={<Trash size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Delete_Request"
                />
              </React.Fragment>
            )}
          </div>
        </div>
      )}
      {/* end menu button */}
    </>
  );
};

export default PersonalCalenderList;
