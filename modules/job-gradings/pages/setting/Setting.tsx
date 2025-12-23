import { AppTable } from "@hrbox/uikit/components";
import { Indicators } from "../../app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import SettingModal from "../../modals/SettingModal";
const Action = [];

const Setting = () => {
  const modal = useModal();
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "Setting",
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
        rowActions={[]}
        hasPagination={true}
      />
    </div>
  );
};

export default Setting;
