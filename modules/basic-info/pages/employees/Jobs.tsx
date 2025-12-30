import { Card } from '@heroui/react';
import { Jobss } from '@module/basic-info/app/mock';
import { AppButton } from '@hrbox/uikit/components';
import { Buildings, Calendar, Designtools, Location, Trash } from 'iconsax-reactjs';
import { useState } from 'react';

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
    <>
      <BasicInfoLayout
        content={
          <div className="grid grid-cols-4 gap-3 w-full p-4">
            {jobs.map((user, index) => (
              <Card
                isPressable
                onPress={handleOpenJobModal}
                key={index} className="py-2 px-3  hover:bg-[#D6F2FF] hover:cursor-pointer shadow-sm">
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
                <div className="flex flex-col">
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
