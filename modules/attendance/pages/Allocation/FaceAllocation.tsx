import { AppTable } from "@hrbox/uikit/components";
import { Allocatio, getAllAllocations } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import FaceAllocationModal from "@hrbox/modules/attendance/modals/FaceAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

const FaceAllocation = () => {
  const modal = useModal();
  const {t}=useTranslation()
  const [data, setData] = useState(getAllAllocations());
  const handleRowClick = (row:any) => {
    modal.open(
      ModalType.VIEW,
      "face-allocation-form",
      <FaceAllocationModal />,
      {
        data:row,
        isForm: true,
        title:t("face-recognition-assignment"),
        icon:<Hierarchy3 size={18} />,
        formConfig: {
          formId: "face-allocation-form"
        }
      },
      ModalSize["2XL"]
    );
  };
  const handleEditClick = (row:any) => {
    modal.open(
      ModalType.EDIT,
      "face-allocation-form",
      <FaceAllocationModal />,
      {
        data:row,
        isForm: true,
        title:t("edit-face-recognition-assignment"),
                submitLabel: t("submit"),
        cancelLabel: t("cancel"),
        icon:<Hierarchy3 size={18} />,
        formConfig: {
          formId: "face-allocation-form"
        }
      },
      ModalSize["2XL"]
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
          onEdit={(row)=>handleEditClick(row)}
          onDelete={()=>console.log("delete")}
        />
      </div>
    </>
  );
};
export default FaceAllocation;
