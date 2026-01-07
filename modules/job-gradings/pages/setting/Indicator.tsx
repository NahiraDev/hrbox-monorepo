import { AppTable } from "@hrbox/uikit/components";
import { Indicators } from "../../app/mock";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import SettingModal from "../../modals/SettingModal";
import {Hierarchy3} from "iconsax-reactjs";
import {useTranslation} from "react-i18next";
const Action = [];

const Indicator = () => {
    const { t } = useTranslation();
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
    const handleEditClick = (row:any) => {
        modal.open(
            ModalType.EDIT,
            "face-allocation-form",
            <SettingModal/>,
            {
                data:row,
                isForm: true,
                title:t("edit-face-recognition-assignment"),
                submitLabel: t("submit"),
                cancelLabel: t("cancel"),
                icon:<Hierarchy3 size={18} />,
                formConfig: {
                    formId: "general-form"
                }
            },
            ModalSize["3XL"]
        );
    };
  return (
    <div className="w-full h-full flex  justify-center ">
      <AppTable
        data={Indicators}
        onEdit={(row)=>handleEditClick(row)}
        onDelete={()=>console.log('deleting')}
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
