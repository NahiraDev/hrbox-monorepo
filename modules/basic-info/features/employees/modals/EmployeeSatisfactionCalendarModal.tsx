import { AppButton, AppModal } from '@hrbox/uikit/components';
import { Avatar } from '@heroui/react';
import { useState } from 'react';
import FilterCalenderModal from '@module/basic-info/features/employees/modals/FilterCalenderModal'
import { Filter } from 'iconsax-reactjs';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';

const sampleData = [
  { id: 1, name: 'Jahan', role: 'Mentor', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d', badgeColor: 'red' },
  { id: 2, name: 'Ali', role: 'Developer', avatar: 'https://i.pravatar.cc/150?u=b04258114e29026302d', badgeColor: 'green' },
  { id: 3, name: 'Sara', role: 'Designer', avatar: 'https://i.pravatar.cc/150?u=c04258114e29026302d', badgeColor: 'orange' },
  { id: 4, name: 'Reza', role: 'Manager', avatar: 'https://i.pravatar.cc/150?u=d04258114e29026302d', badgeColor: 'green' },
  { id: 5, name: 'Nina', role: 'Analyst', avatar: 'https://i.pravatar.cc/150?u=e04258114e29026302d', badgeColor: 'red' },
  { id: 6, name: 'Kamran', role: 'Tester', avatar: 'https://i.pravatar.cc/150?u=f04258114e29026302d', badgeColor: 'orange' },
  { id: 7, name: 'Fatemeh', role: 'HR Specialist', avatar: 'https://i.pravatar.cc/150?u=g04258114e29026302d', badgeColor: 'green' },
  { id: 8, name: 'Hossein', role: 'Engineer', avatar: 'https://i.pravatar.cc/150?u=h04204258114e29026302d', badgeColor: 'red' },
];

const getBadgeGradient = (color) => {
  switch (color) {
    case 'green':
      return 'bg-gradient-to-br from-green-400 to-green-700';
    case 'orange':
      return 'bg-gradient-to-br from-orange-400 to-orange-700';
    case 'red':
      return 'bg-gradient-to-br from-red-400 to-red-700';
    default:
      return 'bg-gradient-to-br from-red-400 to-red-700';
  }
};

const MentorCard = ({ name, role, avatar, badgeColor }) => {

  return (
    <div className="flex flex-col gap-4 items-center justify-center px-5 py-6 relative">
      <div className="absolute z-100 top-1 right-2">
        <div className={`w-5 h-5 ${getBadgeGradient(badgeColor)} rounded-full`}></div>
      </div>
      <div className="flex flex-col gap-2">
        <Avatar className='w-24 h-24' radius="lg" src={avatar} />
        <span className="!font-semibold text-xs text-secondary-1000">{name}</span>
        <span className="flex items-center justify-center !text-xs rounded-full px-2 h-5 border border-primary-50 text-primary-400 bg-surface-50">
          {role}
        </span>
      </div>
    </div>
  );
};

const EmployeeSatisfactionCalendarModal = ({ data = sampleData, onItemPress }) => {
  const { openModal } = useModalContext();
  const handlePress = (item) => {
    if (onItemPress) onItemPress(item);
  };

  return (
    <AppModal.Body>
      <div className="grid grid-cols-4 gap-10 p-5">
        {data.map((item) => (
          <AppButton
            key={item.id}
            props={{
              size: 'xs',
              radius: 'sm',
              color: 'white',
              variant: 'solid',
              isIconOnly: true,
              onPress: () => openModal('edit',"", <FilterCalenderModal/>,undefined,"sm","Filter", <Filter className='text-white'/> ),
              className: 'shadow-sm rounded-2xl',
              content: <MentorCard {...item} />,
            }}
          />
        ))}
      </div>
    </AppModal.Body>
  );
};

export default EmployeeSatisfactionCalendarModal;
