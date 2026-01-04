import {
  AppButton,
  AppPageTitle,
  AppSearchInput,
} from "@hrbox/uikit/components";
import { Add, ArrowLeft2 } from "iconsax-reactjs";
import {
  ModalSize,
  ModalType,
  useModalContext,
} from "@hrbox/core/providers/ModalProvider";
import React from "react";
import { useModal } from "@hrbox/core/hooks";
import { useTranslation } from "react-i18next";
interface AllocationSubheaderProps {
  modalComponent: React.ComponentType;
  title: string;
  icon: React.ReactNode;
}
const AllocationSubheader = ({
  modalComponent: ModalComponent,
  title,
  icon,
}: AllocationSubheaderProps) => {
  const { t } = useTranslation();
  const modal = useModal();
  const handlerOpenModal = () => {
    modal.open(
      ModalType.CREATE,
      title,
      <ModalComponent />,
      {
        isForm: true,
        submitLabel: "Submit",
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
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <span>
            <ArrowLeft2 />
          </span>
          <AppPageTitle title={t(title)} icon={icon} />
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput />
          <AppButton
            color="white"
            size="md"
            radius="lg"
            startContent={<Add size={22} />}
            className="border-1 border-primary"
            onPress={handlerOpenModal}
            content={t("add_new_one")}
          />
        </div>
      </div>
    </>
  );
};
export default AllocationSubheader;
