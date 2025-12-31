import { AppTable } from "@hrbox/uikit/components";
import { Allocatio } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import FaceAllocationModal from "@hrbox/modules/attendance/modals/FaceAllocationModal";

const FaceAllocation = () => {
  const modal = useModal();
  const [data, setData] = useState(Allocatio);
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "face-allocation",
      <FaceAllocationModal />,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "face-allocation"
        }
      },
      ModalSize["3XL"]
    );
  };
  return (
    <>
      <div className="h-full w-full flex flex-col ">
        <AppTable
          data={data}
          showStatus={true}
          hasPagination={true}
          pageSize={8}
          onRowClick={handleRowClick}
          variant="bordered"
        />
      </div>
    </>
  );
};
export default FaceAllocation;
