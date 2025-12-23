import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import { Add, ArrowLeft2 } from "iconsax-reactjs";
import { AppButton, AppSearchInput } from "@hrbox/uikit/components";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import SettingModal from "../modals/SettingModal";
interface SettingSubheaderProps {
  title: string;
  icon: React.ReactNode;
}
const SettingHeader = ({
  title,
  icon
  }: SettingSubheaderProps)  => {
  const { t } = useTranslation();
  const modal=useModal();
  const handlerOpenModal=()=>{
    modal.open(
      ModalType.CREATE,
      title,
      <SettingModal />,
      {
        isForm: true,
        submitLabel: "Submit Again",
        cancelLabel: "Cancel",
        formConfig: {
          formId: "face-form",
        },
      },
      ModalSize['2XL']
    );
  }
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <span><ArrowLeft2/></span>
          <AppPageTitle title={t(title)} icon={icon}/>
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput />
          <AppButton
              color= 'white'
              size= 'md'
              radius= 'lg'
              startContent= {<Add size={22} />}
              className= 'border-1 border-primary'
              onPress={handlerOpenModal}
                content={t('add_new_one')}
            
          />
        </div>
      </div>
    </>
  );
};

export default SettingHeader;
