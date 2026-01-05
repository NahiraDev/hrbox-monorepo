import { Card } from '@heroui/react';
import { education } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Buildings, Calendar, Category, Designtools, Edit, Location, Teacher, Trash } from "iconsax-reactjs";
import { ModalSize, ModalType, useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import React, { useState } from 'react';
import { TickIcon } from "@hrbox/uikit/icons";
import EducationModals from "@hrbox/modules/basic-info/modals/EducationModals";
import {
  formValidationOrganizationLocation,
  initialValuesOrganizationLocation
} from "@hrbox/modules/basic-info/forms/OrganizationLocationForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { useModal } from "@hrbox/core/hooks";

const Education = () => {
  const { openModal } = useModalContext();

  const [educationList, setEducationList] = useState(education);

  const handleDeleteClick = (index: number) => {
    // openModal(
    //   'delete',
    //   '',
    //   <AppDeleteModal
    //     onConfirm={() => handleDeleteConfirm(index)}
    //     onCancel={() => console.log('Cancelled')}
    //   />,
    //   undefined,
    //   'sm',
    //   'Do you want to remove it?',
    //   <Trash className='text-white'/>
    // );
  };

  const handleDeleteConfirm = (index: number) => {
    setEducationList(prev => {
      const newEducation = [...prev];
      newEducation.splice(index, 1);
      return newEducation;
    });
  };

  const modal = useModal();

  const handleModalEducation = () => {
    modal.open(
      ModalType.VIEW,
      "DynamicAddModal",
      <EducationModals />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Teacher size={22}/>  Education Details</div>,
        submitLabel: "Submit",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };  const handleModalEducationEdit = () => {
    modal.open(
      ModalType.EDIT,
      "DynamicAddModal",
      <EducationModals />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Teacher size={22}/> Edit Education</div>,
        submitLabel: "Save Changes",
        cancelLabel: "Cancel",
        formConfig: {
          initialValues: initialValuesOrganizationLocation,
          validationSchema: formValidationOrganizationLocation,
          formId: "DynamicAddModal",
          enableCache: true,
          clearCacheOnSubmit: true,
          onSubmitAsync: async (values: any) => {
            handleSubmitAward(values);
            modal.close(ModalType.VIEW, "DynamicAddModal");
          },
        },
      },
      ModalSize.XL,
    );
  };
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <BasicInfoLayout
        content={
          <div className="grid grid-cols-4 gap-3 w-full p-4">
            {educationList.map((user, index) => (
              <Card
                isPressable
                onPress={handleModalEducation}
                onClick={() => setActiveIndex(index)}
                key={index}
                className={`
                py-2 px-3  hover:cursor-pointer shadow-sm
                  transition-all duration-200
                hover:!bg-[#D6F2FF]
                ${activeIndex === index
                  ? "bg-[#D6F2FF] border border-primary-400"
                  : "border border-transparent"
                }
                `}>
                <div className="flex items-center justify-between border-b-2 border-neutral-100">
                  <div className="flex items-center gap-2">
                    <div className='rounded-full w-2 h-2 bg-green-600'></div>
                    <Designtools size={18} />
                    <span className="font-semibold text-sm text-secondary-1000">{user.job}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TickIcon
                      width={16}
                      height={16}
                    />
                    <div className="flex items-center">
                    <AppButton
                      size= 'xs'
                      radius= 'sm'
                      variant= 'light'
                      isIconOnly= {true}
                      onPress= {handleModalEducationEdit}
                      content= {<Edit className="text-secondary-1000 group-hover:text-white" size={16} />}
                      className= 'p-2 hover:!bg-primary-400 transition-all duration-200'
                    />
                    <AppButton
                      size= 'xs'
                      radius= 'sm'
                      variant= 'light'
                      isIconOnly= {true}
                      onPress= {() => handleDeleteClick(index)}
                      content= {<Trash className="text-secondary-1000 group-hover:text-white" size={16} />}
                      className= 'p-2 hover:!bg-red-500 transition-all duration-200'
                    />
                  </div>
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <div className="flex items-center justify-between px-2  py-1.5">
                    <div className="flex gap-1.5 items-center">
                      <Buildings size={16} />
                      <span className='text-xs text-secondary-1000 '>Company</span>
                    </div>
                    <div>
                      <span className='text-xs text-secondary-1000 font-semibold'>{user.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between  px-2  py-1.5">
                    <div className="flex gap-1.5 items-center">
                      <Calendar  size={16}/>
                      <span className='text-xs text-secondary-1000 '>Date</span>
                    </div>
                    <div>
                      <span className='text-xs text-secondary-1000 font-semibold'>{user.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between  px-2  py-1.5">
                    <div className="flex gap-1.5 items-center">
                      <Location  size={16}/>
                      <span className='text-xs text-secondary-1000 '>Location</span>
                    </div>
                    <div>
                      <span className='text-xs text-secondary-1000 font-semibold'>{user.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        }
      />
    </>
  );
};

export default Education;
