import { Card } from '@heroui/react';
import { achivements } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import { Settings, TextalignJustifyleft, Trash, Calendar, Teacher } from 'iconsax-react';
import { useModalContext } from '@core/context';

import { BasicInfoLayout } from '@module/basic-info/features/common';
import AddNewCourses from '@module/basic-info/features/employees/modals/AddNewCourses';

const Achievements = () => {
  const { openModal } = useModalContext();

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-4 gap-4 w-full p-4">
          {achivements.map((user: any, index) => (
            <Card key={index} className="p-3 w-full h-full shadow-light-tight-1 bg-white ">
              <div className="flex flex-col gap-2 ">
                <div className="flex justify-between border-b border-gray-200 p-1">
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    <Teacher />
                    <span>{user.job}</span>
                  </div>
                  <div className="flex gap-1">
                    <div>
                      <AppButton
                        props={{
                          size: 'xs',
                          radius: 'sm',
                          variant: 'light',
                          isIconOnly: true,
                          onPress: () => openModal('delete',"", <AppDeleteModal />, undefined, 'lg',"Do you want to remove it?",<Trash className='text-white'/>),
                          content: <Trash className="text-secondary-1000 group-hover:text-white" />,
                          className: 'p-2 hover:!bg-red-500 transition-all duration-200',
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex text-xs gap-0.5 items-center justify-between w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <div className="flex gap-2 items-center">
                    <Settings size="20" />
                    <span>Title</span>
                  </div>
                  <div className="font-semibold">
                    <span>{user.title}</span>
                  </div>
                </div>
                <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <div className="flex gap-2 items-center">
                    <Calendar size="20" />
                    <span>Date</span>
                  </div>
                  <div className="font-semibold">
                    <span>{user.date}</span>
                  </div>
                </div>
                <div className="flex  text-xs flex-col gap-2 items-start w-full border border-[#DCF0F9]/40 rounded-5 p-1.5">
                  <div className="flex gap-2 items-center">
                    <TextalignJustifyleft size="20" />
                    <span>Description</span>
                  </div>
                  <div className="font-semibold">
                    <span>{user.description}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <AddNewCourses/>
          <AppDeleteModal />
        </div>
      }
    />
  );
};

export default Achievements;
