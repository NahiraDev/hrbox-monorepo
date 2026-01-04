import { Card } from '@heroui/react';
import { dataWorker } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Settings, TextalignJustifyleft, Trash, Calendar, Teacher } from 'iconsax-reactjs';
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { useState } from 'react';

import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import CoursesModal from "@hrbox/modules/basic-info/modals/CoursesModal";
import JobModal from "@hrbox/modules/basic-info/modals/JobModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";

const Courses = () => {
  const { openModal } = useModalContext();
  const [courses, setCourses] = useState(dataWorker);

  // 2. Function to open the delete confirmation modal
  const handleDeleteClick = (index: number) => {
    // openModal(
    //   'delete',
    //   '',
    //   <AppDeleteModal
    //     // Pass the confirmation function as the onConfirm prop
    //     onConfirm={() => handleDeleteConfirm(index)}
    //     onCancel={() => console.log('Deletion cancelled')}
    //   />,
    //   undefined,
    //   'sm',
    //   'Do you want to remove it?',
    //   <Trash className='text-white'/>
    // );
  };

  const handleDeleteConfirm = (index: number) => {
    setCourses(prev => {
      const newCourses = [...prev];
      newCourses.splice(index, 1);
      return newCourses;
    });
  };

  const modal = useModal();

  const  handleOpenCoursesModal = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <CoursesModal />,
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
          {courses.map((user: any, index) => (
            <Card
              isPressable
              onPress={handleOpenCoursesModal}
              key={index}
              className="p-3 shadow-sm hover:!bg-[#D6F2FF] hover:cursor-pointer bg-white">
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between border-b border-neutral-100 p-1">
                  <div className="flex items-center gap-2">
                    <div className='rounded-full w-2 h-2 bg-green-600'></div>
                    <Teacher size={24} />
                    <span className='text-secondary-1000 text-[16px] font-semibold'>{user.job}</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <AppButton
                        size='xs'
                        radius='sm'
                        variant='light'
                        isIconOnly={true}
                          onPress={() => handleDeleteClick(index)}
                          content={<Trash className="text-secondary-1000 group-hover:text-white" size={16} />}
                          className='p-2 hover:!bg-red-500 transition-all duration-200'
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5 mt-2">
                  <div className="flex gap-1.5 items-center">
                    <Settings size="16" />
                    <span className="text-xs text-secondary-1000">Title</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-secondary-1000 font-semibold text-xs'>{user.title}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5">
                  <div className="flex gap-1.5 items-center">
                    <Calendar size="16" />
                    <span className="text-xs text-secondary-1000">Date</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-secondary-1000 font-semibold text-xs'>{user.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5">
                  <div className="flex gap-1.5 items-center">
                    <TextalignJustifyleft size="16" />
                    <span className="text-xs text-secondary-1000">Description</span>
                  </div>
                  <div className="font-semibold">
                    <span className='text-secondary-1000 font-semibold text-xs'>{user.description}</span>
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

export default Courses;
