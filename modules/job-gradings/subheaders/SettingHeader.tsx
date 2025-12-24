import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import { Add, ArrowLeft2, Setting } from "iconsax-reactjs";
import { AppButton, AppSearchInput } from "@hrbox/uikit/components";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "@hrbox/core/hooks";
import SettingModal from "../modals/SettingModal";
import { useLocation, useNavigate } from "@tanstack/react-router";
interface SettingSubheaderProps {
  title: string;
  icon: React.ReactNode;
}
const SettingHeader = ({ title, icon }: SettingSubheaderProps) => {
  const { t } = useTranslation();
  const modal = useModal();
  const navigate = useNavigate()
  const location = useLocation()
    const isGeneral =
        location.pathname === "/job-gradings/setting/general";

    const isIndicators =
        location.pathname === "/job-gradings/setting/indicators";
  const handlerOpenModal = () => {
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
      ModalSize["2XL"]
    );
  };
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3">
              <AppButton
                  color={isIndicators ? "primary" : "white"}
                  size="md"
                  radius="lg"
                  startContent={<Setting size={18} />}
                  className={isIndicators ? "text-black" : "text-white"}
                  onPress={() =>
                      navigate({ to: "/job-gradings/setting/indicators" })
                  }
                  content={t("indicators")}
              />

              <AppButton
                  color={isGeneral ? "primary" : "white"}
                  size="md"
                  radius="lg"
                  startContent={<Setting size={18} />}
                  className={isGeneral ? "text-black" : "text-white"}
                  onPress={() =>
                      navigate({ to: "/job-gradings/setting/general" })
                  }
                  content={t("General")}
              />

          </div>
          
        </div>
       
    
       
      </div>
    </>
  );
};

export default SettingHeader;
