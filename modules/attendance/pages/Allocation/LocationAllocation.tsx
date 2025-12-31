import { AppTable } from "@hrbox/uikit/components";
import { Allocatio, getAllAllocations } from "@hrbox/modules/attendance/app/mock";
import { useState } from "react";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import LocationAllocationModal from "@hrbox/modules/attendance/modals/LocationAllocationModal";

const LocationAllocation = () => {
  const [data, setData] = useState(Allocatio);
  const modal = useModal();
     const refreshData = () => {
      setData(getAllAllocations());
    };
  const handleRowClick = (row:any) => {
    modal.open(
      ModalType.VIEW,
      "location-allocation",
      <LocationAllocationModal onSuccess={refreshData} />,
      {
        data:row,
        isForm: true,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "location-allocation",
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
          onRowClick={(row)=>handleRowClick(row)}
          variant="bordered"
        />
      </div>
    </>
  );
};
export default LocationAllocation;
