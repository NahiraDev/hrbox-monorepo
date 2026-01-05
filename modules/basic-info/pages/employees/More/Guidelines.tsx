import { guidlines } from '@module/basic-info/app/mock';
import { Card, Avatar } from '@heroui/react';
import { Add, UserSearch } from "iconsax-reactjs";
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import {useTranslation} from "react-i18next";
import { AppButton } from "@hrbox/uikit/components";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import GuidelinesModal from "@hrbox/modules/basic-info/modals/GuidelinesModal";

const Guidelines = () => {

    const {t} = useTranslation()

  const modal = useModal();

  const  handleOpenGuidelinesModalShow = () => {
    modal.open(
      ModalType.VIEW,
      " GuidelinesModal",
      <GuidelinesModal />,
      {
        isForm: true,
        title: "Add New Guidlines",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.SM,
    );
  };

  const  handleOpenGuidelinesModal = () => {
    modal.open(
      ModalType.CREATE,
      " GuidelinesModal",
      <GuidelinesModal />,
      {
        isForm: true,
        title: "Add New Guidlines",
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesRelative,
          validationSchema: formValidationRelative,
          formId: "award-form",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.CREATE, "award-form");
          },
        },
      },
      ModalSize.SM,
    );
  };


  return (
    <BasicInfoLayout
      content={
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 p-3">
              <UserSearch size="26" />
              <span className="text-xl font-semibold text-secondary-1000">{t('Guidlines')}</span>
            </div>
            <AppButton
              size="xs"
              radius="sm"
              color="white"
              variant="solid"
              onPress={handleOpenGuidelinesModal}
              isIconOnly={true}
              className="bg-white border-1 border-primary p-1 mr-5"
              content={<Add className="text-secondary-900" size={19} />}
            />
          </div>

          <div className="grid grid-cols-11 gap-3 overflow-y-scroll p-2 ">
            {guidlines.map((guidline, index) => (
              <Card
                isPressable
                onPress={handleOpenGuidelinesModalShow}
                key={index}
                className="flex justify-center items-center gap-3 p-4 border border-[#DCF0F9] shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer rounded-xl">
                <Avatar className="w-32 h-32" radius="lg" src="" color="primary" />
                <span
                  className="max-w-[13ch] truncate whitespace-nowrap overflow-hidden text-xs font-semibold text-secondary-1000"
                >
                  {guidline.job}
                </span>

              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Guidelines;
