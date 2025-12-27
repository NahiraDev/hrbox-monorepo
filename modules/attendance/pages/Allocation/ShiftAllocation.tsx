import { AppTable } from "@hrbox/uikit/components";
import { Allocatio } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import ShiftAllocationModal from "@hrbox/modules/attendance/modals/ShiftAllocationModal";

const ShiftAllocation = () => {
  const [data, setData] = useState(Allocatio);
  const modal = useModal();
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "shift-allocation",
      <ShiftAllocationModal />,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "shift-form",
        },
      },
      ModalSize["3XL"],
    );
  };

  return (
    <>
      <div className="h-full w-full flex flex-col ">
        <AppTable data={data} onRowClick={handleRowClick} />
      </div>
    </>
  );
};
export default ShiftAllocation;
