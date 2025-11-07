import { technicalDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from '@hrbox/uikit/components';
import { OrganizationDepartmentModal } from '@module/basic-info/features/departments/modals/OrganizationDepartmentModal';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import { Category, TickCircle } from 'iconsax-react';

const TechnicalDepartments = () => {
  const { openModal } = useModalContext();
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="w-full grid grid-cols-9 gap-4">
        {technicalDepartment.map((user, index) => (
          <Card
            key={index}
            className="p-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-2 relative">
            <Avatar className="w-30 h-30 " color="primary" radius="lg" src="https://i.pravatar.cc/150?u=d04258114e29026302d" />
            <TickCircle className="absolute top-2 right-3" size="22" color="gray" />
            <span className="!text-sm !font-semibold text-secondary-1000">{user.name}</span>
            <AppButton
              props={{
                className: 'h-5 text-xs bg-surface-50 text-[#0A9AD7] border-1 border-primary-50 text-primary-400',
                size: 'sm',
                radius: 'sm',
                onPress: () => openModal('custom', "",<OrganizationDepartmentModal/> , undefined, '3xl',"Organization Depatments", <Category className='text-white'/> ),
                content: <span>{user.job}</span>,
              }}
            />
          </Card>
        ))}
      </div>
      <div className="w-full flex items-center justify-end">
       <span className="!text-[100px] !font-extrabold text-secondary-400/40">200</span>
      </div>
    </div>
  );
};

export default TechnicalDepartments;
