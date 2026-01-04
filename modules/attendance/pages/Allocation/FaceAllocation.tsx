import { AppTable } from "@hrbox/uikit/components";
import { Allocatio, getAllAllocations } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import FaceAllocationModal from "@hrbox/modules/attendance/modals/FaceAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";

const FaceAllocation = () => {
  const modal = useModal();
  const [data, setData] = useState(getAllAllocations());
  const handleRowClick = (row:any) => {
    modal.open(
      ModalType.VIEW,
      "face-allocation-form",
      <FaceAllocationModal />,
      {
        data:row,
        isForm: true,
        title:"Face Recognition Assignment",
        icon:<Hierarchy3 size={18} />,
        formConfig: {
          formId: "face-allocation-form"
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
          onRowClick={(row)=>handleRowClick(row)}
          variant="bordered"
        />
      </div>
    </>
  );
};
export default FaceAllocation;
