import { technicalDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from '@core/components';
import { useModalContext } from '@root/core';
import { TickIcon } from '@root/shared/icons/TickIcon';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { useNavigate } from 'react-router-dom';

const TechnicalDepartments = () => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3">
        {technicalDepartment.map((user, index) => (
          <Card
            isPressable
            key={index}
            className="cursor-pointer p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3 relative hover:!bg-surface-50"
            onPress = {() => navigate(BasicInfoPaths.PersonalInformation)}
            >
           <Avatar className="w-24 h-24 sm:w-30 sm:h-30 bg-primary-400 text-white rounded-xl" src="" />
            <div className="absolute top-2 right-4">
              <TickIcon color="#CCCCCC" />
            </div>
            <div className=" text-center mt-2 group">
              <div className="relative w-full overflow-hidden h-6 flex items-center justify-center">
                <span className="block !text-xs !font-semibold text-secondary-1000 truncate">
                {user.name}
                </span>
                {user.name.length > 13 && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100  pointer-events-none transition-opacity duration-200">
                    <div className="animate-marquee whitespace-nowrap">
                     <span className="lg:text-sm sm:text-xs text-xs font-semibold text-secondary-1000 inline-block">
                       {user.name}&nbsp;&nbsp;
                    </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <AppButton
              props={{
                className: 'h-5 bg-surface-50  border-1 border-primary-50 text-primary-400',
                radius: 'sm',
                content: <span className="!text-xs">{user.job}</span>,
              }}
            />
          </Card>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
       <span className="!text-[100px] !font-extrabold text-secondary-400/20">200</span>
      </div>
    </div>
  );
};

export default TechnicalDepartments;
