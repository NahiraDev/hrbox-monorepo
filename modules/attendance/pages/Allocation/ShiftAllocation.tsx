import { AppTable } from "@hrbox/uikit/components";
import {
  Allocatio,
  getAllAllocations,
} from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import ShiftAllocationModal from "@hrbox/modules/attendance/modals/ShiftAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

const ShiftAllocation = () => {
  const [data, setData] = useState(getAllAllocations());
  const modal = useModal();
  const { t } = useTranslation();
  const refreshData = () => {
    setData(getAllAllocations());
  };
  const handleRowClick = (row: any) => {
    modal.open(
      ModalType.VIEW,
      "shift-allocation",
      <ShiftAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("shift-allocation"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "shift-allocation",
        },
      },
      ModalSize["4XL"]
    );
  };
  const handleEditClick = (row: any) => {
    modal.open(
      ModalType.EDIT,
      "shift-allocation",
      <ShiftAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("edit-shift-allocation"),
        submitLabel: t("submit"),
        cancelLabel: t("cancel"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "shift-allocation",
          onSubmitAsync: async (values: any) => {
            console.log("shift log");
          }
        },
      },
      ModalSize["4XL"]
    );
  };

  return (
    <>
      <div className="h-full w-full flex flex-col ">
        <AppTable
          data={data}
          onRowClick={(row) => handleRowClick(row)}
          variant="bordered"
          onEdit={(row) => handleEditClick(row)}
          onDelete={()=>console.log("delete")}
        />
      </div>
    </>
  );
};
export default ShiftAllocation;
