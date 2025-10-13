import { Card } from '@heroui/react';
import { education } from '@module/basic-info/app/mock';
import { AppButton, AppDeleteModal } from '@core/components';
import { Buildings, Calendar,User, Designtools, Location, Trash } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { BasicInfoLayout } from '@module/basic-info/features/common';

const Education = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <BasicInfoLayout
        content={
          <div className="grid grid-cols-4 gap-3 w-full p-4 ">
            {education.map((user, index) => (
              <Card key={index} className="py-2 px-3">
                <div className="flex items-center justify-between border-b-2 border-gray-200 p-1.5">
                  <div className="flex items-center gap-2">
                    <Designtools />
                    <span className="font-bold">{user.job}</span>
                  </div>
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
                <div className="flex flex-col gap-2 p-2">
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2 ">
                      <Buildings />
                      <span>Uni</span>
                    </div>
                    <div>
                      <span>{user.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2">
                      <Calendar />
                      <span>Date</span>
                    </div>
                    <div>
                      <span>{user.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-1.5">
                    <div className="flex gap-2">
                      <Location />
                      <span>Location</span>
                    </div>
                    <div>
                      <span>{user.location}</span>
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
