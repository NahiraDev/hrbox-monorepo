import { AppTable } from "@hrbox/uikit/components";
import {
  Allocatio,
  getAllAllocations,
} from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import IpAllocationModal from "@hrbox/modules/attendance/modals/IpAllocationModal";
import { get } from "node:http";
import { Hierarchy3 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

const IpAllocation = () => {
  const [data, setData] = useState(getAllAllocations());
  const { t } = useTranslation();
  const modal = useModal();
  const handleRowClick = (row: any) => {
    modal.open(
      ModalType.VIEW,
      "ip-allocation-form",
      <IpAllocationModal />,
      {
        data: row,
        isForm: true,
        title: t("edit-iP-allocation"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "ip-allocation-form",
        },
      },
      ModalSize["3XL"]
    );
  };
  const handleEditClick = (row: any) => {
    modal.open(
      ModalType.EDIT,
      "ip-allocation-form",
      <IpAllocationModal />,
      {
        data: row,
        isForm: true,
        title: t("edit-iP-allocation"),
        icon: <Hierarchy3 size={18} />,
        submitLabel: t("submit"),
        cancelLabel: t("cancel"),
        formConfig: {
          formId: "ip-allocation-form",
        },
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
          onRowClick={(row) => handleRowClick(row)}
          variant="bordered"
          onEdit={(row) => handleEditClick(row)}
        />
      </div>
    </>
  );
};
export default IpAllocation;
