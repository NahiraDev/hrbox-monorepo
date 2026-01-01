import { AppTable } from "@hrbox/uikit/components";
import { Indicators } from "../../app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import SettingModal from "../../modals/SettingModal";
const Action = [];

const Indicator = () => {
  const modal = useModal();
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "Indicator",
      <SettingModal/>,
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
        variant="bordered"
        rowActions={[]}
        hasPagination={true}
      />
    </div>
  );
};

export default Indicator;
