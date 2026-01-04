import { Card } from '@heroui/react';
import { Jobss } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Buildings, Calendar, Category, Designtools, Edit, Location, Trash } from "iconsax-reactjs";
import React, { useState } from 'react';

import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import {useModal} from "@hrbox/core/hooks";
import JobModal from "@hrbox/modules/basic-info/modals/JobModal";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import DocumentsModal from "@hrbox/modules/basic-info/modals/DocumentsModal";
import { formValidationRelative, initialValuesRelative } from "@hrbox/modules/basic-info/forms/RelativeForm";
import { handleSubmitAward } from "@hrbox/modules/hrlink/forms/AwardForm";
import { TickIcon } from "@hrbox/uikit/icons";

const Jobs = () => {
  const modal = useModal();
  const [jobs, setJobs] = useState(Jobss);

  const cardContainerClass = `grid grid-cols-4 gap-3  overflow-y-scroll  max-h-[calc(66.5vh)] my-6 mx-2.5 pr-4.5
  [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  [&::-webkit-scrollbar-thumb]:hover:bg-blue-800`;


  const handleDeleteConfirm = (index: number)  => {
    setJobs(prev => {
      const newJobs = [...prev];
      newJobs.splice(index, 1);
      return newJobs;
    });
  };

  const handleOpenJobModal = () => {
    modal.open(
      ModalType.VIEW,
      " Documents",
      <JobModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Category size={18}/> Software Management</div>,
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
  };  const handleOpenJobModalEdit = () => {
    modal.open(
      ModalType.EDIT,
      " Documents",
      <JobModal />,
      {
        isForm: true,
        title:<div className="flex items-center gap-2"> <Category size={18}/> Software Management</div>,
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
    <>
      <BasicInfoLayout
        content={
          <div className={cardContainerClass}>
            {jobs.map((user, index) => (
              <Card
                isPressable
                onPress={handleOpenJobModal}
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
                <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-1">
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
                        onPress= {handleOpenJobModalEdit}
                        content= {<Edit className="text-secondary-1000 group-hover:text-white" size={16} />}
                        className= 'p-2 hover:!bg-primary-400 transition-all duration-200'
                      />
                      <AppButton
                        size= 'xs'
                        radius= 'sm'
                        variant= 'light'
                        isIconOnly= {true}
                        // onPress= {() => handleDeleteClick(index)}
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

export default Jobs;
