import { Card } from '@heroui/react';
import { achivements } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Settings, TextalignJustifyleft, Trash, Calendar, Cup, Category, Edit } from "iconsax-reactjs";
import {ModalSize, ModalType, useModalContext} from '@hrbox/core/providers/ModalProvider';

import { BasicInfoLayout } from '@hrbox/modules/basic-info/components/BasicInfoLayout';
import { useModal } from "@hrbox/core/hooks";
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import AchivementsModals from "@hrbox/modules/basic-info/modals/AchivementsModals";
import React, { useState } from "react";

const Achievements = () => {


  const cardContainerClass = `grid grid-cols-4 gap-4  overflow-y-scroll  max-h-[calc(66.5vh)] my-5 mx-2.5 pr-4.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  const modal = useModal();

  const  handleOpenCoursesModal = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <AchivementsModals />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Cup size={22}/>Achievement Details</div>,
        submitLabel: "ذخیره",
        cancelLabel: "لغو",
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
      ModalSize.XL,
    );
  };
  const  handleOpenCoursesModalEdit = () => {
    modal.open(
      ModalType.EDIT,
      " Documents",
      <AchivementsModals />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Cup size={22}/>Edit Achievement</div>,
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
      ModalSize.XL,
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <BasicInfoLayout
      content={
        <div className={cardContainerClass}>
          {achivements.map((user: any, index) => (
            <Card
              isPressable
              onPress={handleOpenCoursesModal}
              onClick={() => setActiveIndex(index)}
              key={index}
              className={`
              p-3  shadow-sm hover:cursor-pointer bg-white
                 transition-all duration-200
                hover:!bg-[#D6F2FF]
                ${activeIndex === index
                ? "bg-[#D6F2FF] border border-primary-400"
                : "border border-transparent"
              }
               `}>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between border-b border-neutral-100 p-1">
                  <div className="flex items-center gap-2">
                    <div className='rounded-full w-2 h-2 bg-green-600'></div>
                    <Cup size="24"  variant="Bold"/>
                    <span className='text-secondary-1000 text-[16px] font-semibold'>Champion</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <div className="flex items-center">
                        <AppButton
                          size= 'xs'
                          radius= 'sm'
                          variant= 'light'
                          isIconOnly= {true}
                          onPress= {handleOpenCoursesModalEdit}
                          content= {<Edit className="text-secondary-1000 group-hover:text-white" size={16} />}
                          className= 'p-2 hover:!bg-primary-400 transition-all duration-200'
                        />
                      <AppButton
                        size='xs'
                        radius='sm'
                        variant='light'
                        isIconOnly={true}
                        content={<Trash className="text-secondary-1000 group-hover:text-white" size={16} />}
                        className='p-2 hover:!bg-red-500 transition-all duration-200'
                      />
                    </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center justify-between w-full border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5 mt-[7px]">
                  <div className="flex gap-1.5 items-center">
                    <Settings size={16} />
                    <span className='text-xs text-secondary-1000'>Title</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-xs text-secondary-1000 font-semibold'>{user.title}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5">
                  <div className="flex gap-1.5 items-center">
                    <Calendar size={16} />
                    <span className='text-xs text-secondary-1000'>Date</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-xs text-secondary-1000 font-semibold'>{user.date}</span>
                  </div>
                </div>
                <div className="flex  flex-col gap-2  w-full border border-[#DCF0F9]/40 rounded-lg  px-2 py-1.5">
                  <div className="flex gap-1.5 items-center">
                    <TextalignJustifyleft size={16} />
                    <span className='text-xs text-secondary-1000'>Description</span>
                  </div>
                  <div className='text-left' >
                    <span className='text-xs text-secondary-1000 font-semibold '>{user.description}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      }
    />
  );
};

export default Achievements;
