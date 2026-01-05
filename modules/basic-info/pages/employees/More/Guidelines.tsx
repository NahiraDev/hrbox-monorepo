import { guidlines } from '@module/basic-info/app/mock';
import { Card, Avatar } from '@heroui/react';
import { Add, Edit, Teacher, Trash, UserSearch } from "iconsax-reactjs";
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import {useTranslation} from "react-i18next";
import { AppButton } from "@hrbox/uikit/components";
import { useModal } from "@hrbox/core/hooks";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import GuidelinesModal from "@hrbox/modules/basic-info/modals/GuidelinesModal";
import React, { useState } from "react";

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
        title:<div className="flex items-center gap-2"> <UserSearch size={22}/>  guideline Details</div>,
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
        title:<div className="flex items-center gap-2"> <UserSearch size={22}/> Add New guideline</div>,
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

  const  handleOpenGuidelinesModalEdit = () => {
    modal.open(
      ModalType.CREATE,
      " GuidelinesModal",
      <GuidelinesModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <UserSearch size={22}/> Edit guideline</div>,
        submitLabel: "Save Changes",
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

  const cardContainerClass = `grid grid-cols-11 gap-3  overflow-y-scroll  max-h-[calc(63.5vh)] mx-2.5 pr-2.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <BasicInfoLayout
      content={
        <div className="flex flex-col ">
          <div className="flex items-center justify-between px-3 pt-6 pb-3">
            <div className="flex items-center gap-1 ">
              <UserSearch size="26" />
              <span className="text-xl font-semibold text-secondary-1000">{t('Guidelines')}</span>
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

          <div className={cardContainerClass}>
            {guidlines.map((guidline, index) => (
              <Card
                isPressable
                onPress={handleOpenGuidelinesModalShow}
                onClick={() => setActiveIndex(index)}
                key={index}
                className={`
                 group flex justify-center items-center gap-3 p-4 border border-[#DCF0F9] 
                 shadow-sm  hover:cursor-pointer rounded-xl relative
                  transition-all duration-200
                  hover:!bg-[#D6F2FF]
                 ${activeIndex === index
                  ? "bg-[#D6F2FF] border border-primary-400"
                  : "border border-transparent"
                }
                 `}
              >
                <div className="flex items-center gap-1 absolute z-10 bottom-13 right-5
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200">
                  <AppButton
                    size="xs"
                    radius="lg"
                    variant="light"
                    onPress={handleOpenGuidelinesModalEdit}
                    isIconOnly
                    content={<Edit className="text-secondary-1000" size={18} />}
                    className="p-1 bg-white hover:bg-primary-400 "
                  />
                  <AppButton
                    size="xs"
                    radius="lg"
                    variant="light"
                    isIconOnly
                    content={<Trash className="text-secondary-1000 " size={18} />}
                    className="p-1 bg-white hover:bg-red-500 "
                  />
                </div>
                <Avatar className="w-32 h-32" radius="lg" src="" color="primary" />

                <span className="group relative text-xs font-semibold text-secondary-1000 inline-block max-w-[13ch] overflow-hidden whitespace-nowrap">
                      {guidline.job.length > 13 ? (
                        <span
                          className="inline-block whitespace-nowrap group-hover:animate-marquee"
                        >
                          {guidline.job}
                        </span>
                      ) : (
                        <span className="inline-block truncate">
                          {guidline.job}
                        </span>
                      )}
                    </span>
                <style>{`
                  @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                  }
                  
                  /* Tailwind inline class workaround */
                  .group-hover\\:animate-marquee:hover {
                    animation: marquee 4s linear infinite;
                  }
                  `}</style>
              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Guidelines;
