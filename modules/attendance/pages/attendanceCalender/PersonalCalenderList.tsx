import { ReportPersonnal } from "@hrbox/modules/attendance/app/mock";

import { AppButton } from "@hrbox/uikit/components";
import {
  Add,
  Edit,
  Trash,
} from "iconsax-reactjs";
import { useMemo, useRef, useState } from "react";
import { useFormContext } from "../../../../core/providers";
const PersonalCalenderList = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuStyle, setMenuStyle] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
  });

   let formValues = {};
  try {
    const formContext = useFormContext();
    formValues = formContext?.values || {};
  } catch (error) {
    // Context might not be available, use empty filter
    console.log("FormContext not available");
  }

  const { month, year, person, department } = formValues;

  // Filter data based on form values
  const filteredData = useMemo(() => {
    return ReportPersonnal.filter((record) => {
      // Parse date to extract month and year
      const recordDate = new Date(record.date);
      const recordMonth = String(recordDate.getMonth() + 1).padStart(2, "0");
      const recordYear = String(recordDate.getFullYear());

      // Apply all filters
      const matchMonth = !month || recordMonth === month;
      const matchYear = !year || recordYear === year;
      const matchPerson = !person || record.person === person;
      const matchDepartment = !department || record.department === department;

      return matchMonth && matchYear && matchPerson && matchDepartment;
    });
  }, [month, year, person, department]);


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
  const rows = Array.from({ length: 15 }, (_, i) => i);
  return (
    <>
      <div className="w-[80%] border border-primary rounded-xl py-4 px-3">
        {/* start table */}
        <div className="w-full flex flex-col  h-full ">
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
            {rows.map((index: number) => (
              <div className="gap-0.5 rounded-md">
                <div className="grid grid-cols-12 gap-2 w-full text-xs  text-[#1E3363] items-center text-center hover:bg-[#DCF0F9] rounded-md ">
                  <div
                    ref={(el) => {
                      if (el) cellRefs.current[`${index}-date`] = el;
                    }}
                    className="col-span-2 p-1 border-b-1 border-white items-center text-start! relative cursor-pointer"
                    onClick={() => toggleMenu(index, "date")}
                  >
                    <p>2025/01/01</p>
                    <p>Wednesday (Present)</p>
                  </div>
                  <div
                    ref={(el) => {
                      if (el) cellRefs.current[`${index}-shift`] = el;
                    }}
                    className="col-span-1 px-2 py-3 border-b-1 border-white items-center cursor-pointer"
                    onClick={() => toggleMenu(index, "shift")}
                  >
                    <p>123456</p>
                  </div>
                  <div className="grid grid-cols-7 col-span-7 border-b-1 border-white items-center">
                    <div className="px-2 py-3">
                      <p>09:00</p>
                    </div>
                    <div className="px-2 py-3">
                      <p>09:00</p>
                    </div>
                    <div className="px-2 py-3">
                      <p>09:00</p>
                    </div>
                    <div className="px-2 py-3">
                      <p>09:00</p>
                    </div>
                    <div className="px-2 py-3">
                      <p>09:00</p>
                    </div>
                    <div className="px-2 py-3 col-span-2 text-center">
                      <p>09:00</p>
                    </div>
                  </div>
                  <div className="col-span-2 px-2 py-3 border-b-1 border-white">
                    <p>Permision from 13:00 to 18:00</p>
                  </div>
                </div>
              </div>
            ))}
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
              <>
                <AppButton
                  content="Daily Leave"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm"
                  size=""
                />
                <AppButton
                  content="Daily Mission"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
                <AppButton
                  content="Edit Traffic Entry"
                  startContent={<Edit size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
                <AppButton
                  content="Delete Request"
                  startContent={<Trash size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
              </>
            ) : (
              <>
                <AppButton
                  content="Daily Leave"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
                <AppButton
                  content="Daily Mission"
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
                <AppButton
                  content="Delete Request"
                  startContent={<Trash size={18} />}
                  className="gap-1.5 text-sm"
                  size=""

                />
              </>
            )}
          </div>
        </div>
      )}
      {/* end menu button */}
    </>
  );
};

export default PersonalCalenderList;
