import { AppTable } from "@hrbox/uikit/components";
import { Allocatio } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import LocationAllocationModal from "@hrbox/modules/attendance/modals/LocationAllocationModal";

const LocationAllocation = () => {
  const [data, setData] = useState(Allocatio);
  const modal = useModal();
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "location-allocation",
      <LocationAllocationModal />,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "location-form",
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
          onRowClick={handleRowClick}
          variant="bordered"
        />
      </div>
    </>
  );
};
export default LocationAllocation;
