import { AppTable } from "@hrbox/uikit/components";
import { Allocatio, getAllAllocations } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import ShiftAllocationModal from "@hrbox/modules/attendance/modals/ShiftAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";

const ShiftAllocation = () => {
const [data, setData] = useState(getAllAllocations()); 
  const modal = useModal();
   const refreshData = () => {
    setData(getAllAllocations());
  };
  const handleRowClick = (row:any) => {
    modal.open(
      ModalType.VIEW,
      "shift-allocation",
      <ShiftAllocationModal  onSuccess={refreshData} />,
      {
        data:row,
        isForm: true,
        title:"Shift Allocation",
        icon:<Hierarchy3 size={18} />,
        formConfig: {
          formId: "shift-allocation",
        },
      },
      ModalSize["3XL"],
    );
  };

  return (
    <>
      <div className="h-full w-full flex flex-col ">
        <AppTable data={data} onRowClick={(row)=>handleRowClick(row)} variant="bordered" />
      </div>
    </>
  );
};
export default ShiftAllocation;
