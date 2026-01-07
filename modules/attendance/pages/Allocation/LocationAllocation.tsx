import { AppTable } from "@hrbox/uikit/components";
import {
  Allocatio,
  getAllAllocations,
} from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import LocationAllocationModal from "@hrbox/modules/attendance/modals/LocationAllocationModal";
import { Hierarchy3 } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";

const LocationAllocation = () => {
  const [data, setData] = useState(Allocatio);
  const modal = useModal();
  const { t } = useTranslation();
  const refreshData = () => {
    setData(getAllAllocations());
  };
  const handleRowClick = (row: any) => {
    modal.open(
      ModalType.VIEW,
      "location-allocation",
      <LocationAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("location-allocation"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "location-allocation",
        },
      },
      ModalSize["2XL"]
    );
  };
  const handleEditClick = (row: any) => {
    modal.open(
      ModalType.EDIT,
      "location-allocation",
      <LocationAllocationModal onSuccess={refreshData} />,
      {
        data: row,
        isForm: true,
        title: t("edit-location-allocation"),
        submitLabel: t("submit"),
        cancelLabel: t("cancel"),
        icon: <Hierarchy3 size={18} />,
        formConfig: {
          formId: "location-allocation",
          onSubmitAsync: async (values: any) => {
            console.log("location allocation edit");
          },
        },
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
          onRowClick={(row) => handleRowClick(row)}
          variant="bordered"
          onEdit={(row) => handleEditClick(row)}
          onDelete={() => console.log("delete")}
        />
      </div>
    </>
  );
};
export default LocationAllocation;
