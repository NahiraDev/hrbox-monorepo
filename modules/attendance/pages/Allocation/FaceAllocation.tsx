import { AppTable } from "@hrbox/uikit/components";
import { Allocatio } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import FaceAllocationShow from "@hrbox/modules/attendance/modals/FaceAllocationShow";
const FaceAllocation = () => {
  const modal = useModal();
  const [data, setData] = useState(Allocatio);
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "face-allocation",
      <FaceAllocationShow />,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "face-form",
        },
      },
      ModalSize.LG
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
          variant="attendance"
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
};
export default FaceAllocation;
