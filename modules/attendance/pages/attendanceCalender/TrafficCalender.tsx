import { Add, Calendar, Trash } from "iconsax-reactjs";
import { AppButton, AppTable } from "@hrbox/uikit/components";
import { PersonalList } from "@hrbox/modules/attendance/app/mock";
import Comprehensivereport from "@hrbox/modules/attendance/pages/attendanceCalender/Comprehensivereport";
import { useState } from "react";

const TrafficCalender = () => {
  const [IsReportHidden, setIsReportHidden] = useState<boolean>(false);
  const month = [
    { key: "Januray", label: "Januray", icon: <Calendar size={33} /> },
    { key: "February", label: "February", icon: <Calendar size={33} /> },
    { key: "March", label: "March", icon: <Calendar size={33} /> },
  ];
  const columns = [
    {
      key: "Date",
      label: "Date",
      render: (value) => value,
    },
    { key: "Shift", label: "Shift" },
    { key: "Check in", label: "Check In" },
    { key: "Check out", label: "Check Out" },
    { key: "Presence", label: "Presence" },
    { key: "Overdue", label: "Overdue" },
    { key: "Delay", label: "Delay" },
    { key: "Haste to leave", label: "Haste to Leave" },
    { key: "Request", label: "Request" },
  ];
  const attendanceConfig = {
    columns,
    columnGroups: [
      { startKey: "date", endKey: "shift", headerClassName: " text-white" },
      { startKey: "checkIn", endKey: "haste", headerClassName: " text-white" },
      {
        startKey: "request",
        endKey: "request",
        headerClassName: " text-white",
      },
    ],
    expandable: {
      render: (row: any, index: number) => {
        return (
          <div className="flex flex-col justify-start  bg-white gap-1.5 shadow-[0_1.25px_4px_0_var(--Secondary-600,#152446)] px-2 py-4 rounded-lg font-normal text-sm font-sans">
            <AppButton
              startContent={<Add />}
              content="Daily Leave"
              className="w-full flex flex-row justify-start"
              size="sm"
            />
            <AppButton
              startContent={<Add />}
              content="Daily Mission"
              className="w-full flex flex-row justify-start"
              size="sm"
            />
            <AppButton
              startContent={<Trash />}
              content="Delete Traffic Entry"
              className="w-full flex flex-row justify-start"
              size="sm"
            />
          </div>
        );
      },
    },
    styles: {
      rowClassName: (row: any) => (row.status === "absent" ? "bg-red-50" : ""),
    },
  };
  return (
    <>
      <div
        className={`${IsReportHidden ? "h-full w-full" : "flex flex-row gap-3 h-full w-full "}`}
      >
        {!IsReportHidden && (
          <AppTable
            data={PersonalList}
            variant="attendance"
            hasPagination={false}
            {...attendanceConfig}
          />
        )}

        <Comprehensivereport
          isExpanded={IsReportHidden}
          onToggle={() => setIsReportHidden(!IsReportHidden)}
        />
      </div>
    </>
  );
};
export default TrafficCalender;
