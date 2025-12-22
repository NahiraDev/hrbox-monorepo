import { AppTable } from "@hrbox/uikit/components";
import { Indicators } from "../../app/mock";
import FaceAllocationModal from "@hrbox/modules/attendance/modals/FaceAllocationModal";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
const Action = [];

const Setting = () => {
  const modal = useModal();
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
          formId: "face-form",
        },
      },
      ModalSize["3XL"]
    );
  };
  return (
    <div className="w-full h-full flex  justify-center ">
      <AppTable
        data={Indicators}
        onRowClick={handleRowClick}
        showStatus={true}
        rowActions={[]}
        hasPagination={true}
      />
    </div>
  );
};

export default Setting;
