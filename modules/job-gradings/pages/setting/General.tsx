import { AppTable } from "@hrbox/uikit/components";
import { GeneralMock } from "@hrbox/modules/job-gradings/app/mock";
import GeneralModal from "../../modals/GeneralModal";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";

const General = () => {
  const modal = useModal();
  const handleRowClick = () => {
    modal.open(
      ModalType.VIEW,
      "general",
      <GeneralModal />,
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
    <div className="w-full h-full flex justify-center">
      <AppTable
        data={GeneralMock}
        onRowClick={handleRowClick}
        showStatus={true}
        rowActions={[]}
        hasPagination={true}
      />
    </div>
  );
};

export default General;
