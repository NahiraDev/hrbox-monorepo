import { Card } from '@heroui/react';
import { Jobss } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import { Buildings, Calendar, Designtools, Location, Trash } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { useState } from 'react';
// import { useState } from 'react';
import { BasicInfoLayout } from '@module/basic-info/features/common';
import { TickIcon } from '@root/shared/icons/TickIcon';

const Jobs = () => {
  const { openModal } = useModalContext();
  const [jobs, setJobs] = useState(Jobss);

  const handleDeleteClick = (index: number) => {
    openModal(
      'delete',
      '',
      <AppDeleteModal
        onConfirm={() => handleDeleteConfirm(index)}
        onCancel={() => console.log('Cancelled')}
      />,
      undefined,
      'sm',
      'Do you want to remove it?',
      <Trash className='text-white'/>
    );
  };

  const handleDeleteConfirm = (index: number) => {
    setJobs(prev => {
      const newJobs = [...prev];
      newJobs.splice(index, 1);
      return newJobs;
    });
  };

  return (
    <>
      <BasicInfoLayout
        content={
          <div className="grid grid-cols-4 gap-3 w-full p-4 overflow-y-auto max-h-[550px]">
            {jobs.map((user, index) => (
              <Card  key={index}
                     className="cursor-pointer px-3 py-2 shadow-sm border border-transparent hover:border-primary-400 transition-all duration-200 ease-in-out">
                <div className="flex items-center justify-between border-b-2 border-gray-200 ">
                    <div className="pl-1 pb-[7px] pt-[5px] flex gap-2 items-center ">
                      <span className="w-2 h-2 rounded-full bg-[#22AD5C]"></span>
                      <Designtools size={18}/>
                      <span className="!font-bold ">{user.job}</span>
                    </div>
                  <div className="flex items-center gap-2 pt-2 pb-1.5">
                    <TickIcon color="#0A9AD7"/>
                    <AppButton
                      props={{
                        size: 'xs',
                        radius: 'sm',
                        variant: 'light',
                        isIconOnly: true,
                        onPress: () => handleDeleteClick(index),
                        content: <Trash className="text-secondary-1000 group-hover:text-white" size={16} />,
                        className: 'p-1 hover:!bg-red-500 transition-all duration-200',
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2 ">
                      <Buildings size={16}/>
                      <span className="!text-xs text-secondary-1000">Company</span>
                    </div>
                    <div>
                      <span className="!font-semibold text-secondary-1000 !text-xs">{user.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2">
                      <Calendar size={16}/>
                      <span className="!text-xs text-secondary-1000">Date</span>
                    </div>
                    <div>
                      <span className="!font-semibold text-secondary-1000 !text-xs">{user.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2">
                      <Location size={16}/>
                      <span className="!text-xs text-secondary-1000">Location</span>
                    </div>
                    <div>
                      <span className="!font-semibold text-secondary-1000 !text-xs">{user.location}</span>
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
