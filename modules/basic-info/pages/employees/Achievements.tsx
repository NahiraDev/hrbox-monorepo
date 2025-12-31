import { Card } from '@heroui/react';
import { achivements } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Settings, TextalignJustifyleft, Trash, Calendar, Cup } from 'iconsax-reactjs';
import {ModalSize, ModalType, useModalContext} from '@hrbox/core/providers/ModalProvider';

import { BasicInfoLayout } from '@hrbox/modules/basic-info/components/BasicInfoLayout';
import { useModal } from "@hrbox/core/hooks";
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";

const Achievements = () => {

  const modal = useModal();

  const  handleOpenCoursesModal = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <AchivementsModals />,
      {
        isForm: true,
        title: "افزودن ",
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


  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-4 gap-4 w-full p-4">
          {achivements.map((user: any, index) => (
            <Card
              isPressable
              onPress={handleOpenCoursesModal}
              key={index}
              className="p-3  shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer bg-white ">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between border-b border-neutral-100 p-1">
                  <div className="flex items-center gap-2">
                    <div className='rounded-full w-2 h-2 bg-green-600'></div>
                    <Cup size="24"  variant="Bold"/>
                    <span className='text-secondary-1000 text-[16px] font-semibold'>Champion</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
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
                <div className="flex  flex-col gap-2 items-start w-full border border-[#DCF0F9]/40 rounded-lg  px-2 py-1.5">
                  <div className="flex gap-1.5 items-center">
                    <TextalignJustifyleft size={16} />
                    <span className='text-xs text-secondary-1000'>Description</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-xs text-secondary-1000 font-semibold'>{user.description}</span>
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
