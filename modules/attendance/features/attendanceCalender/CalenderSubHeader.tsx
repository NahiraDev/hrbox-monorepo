import { Calendar, Export, People, Profile } from 'iconsax-react';
import  AppDropDown  from '@core/components/AppDropDown';
import { useModalContext } from '@core/context';
import AddPermisionTime from '@module/attendance/features/modals/AddPermisionTime';
import PersonnelReportModal from '@module/attendance/features/modals/PersonnelReportModal';

import { AppButton } from '@core/components';

const CalenderSubHeader = () => {
  const years = [
    { key: '2025', label: '2025', icon: <Calendar size={33} /> },
    { key: '2024', label: '2024', icon: <Calendar size={33} /> },
    { key: '2023', label: '2023', icon: <Calendar size={33} /> },
  ];
  const month = [
    { key: 'Januray', label: 'Januray', icon: <Calendar size={33} /> },
    { key: 'February', label: 'February', icon: <Calendar size={33} /> },
    { key: 'March', label: 'March', icon: <Calendar size={33} /> },
  ];
  const { openModal } = useModalContext();

  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row justify-between">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              onPress: () => openModal('confirm', 'PersonalReport', <PersonnelReportModal />),
              startContent: (
                <span>
                  <Profile />
                </span>
              ),
              content: 'Personal attendance calendar',
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              className: 'shadow-none',
              startContent: (
                <span>
                  <People />
                </span>
              ),
              content: 'Group attendance calendar',
            }}
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <AppDropDown
            props={{
              title: '2025',
              item: month,
              title: 'Month',
              className: 'border-1 border-primary px-xl ',
            }}
          />{' '}
          <AppDropDown
            props={{
              title: '2025',
              item: years,
              className: 'border-1 border-primary px-xl ',
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              variant: 'solid',
              radius: 'lg',
              className: 'shadow-none border-1 border-solid border-primary',
              startContent: (
                <span>
                  <Export />
                </span>
              ),
              onPress: () => openModal('confirm', 'AddPermisionTime', <AddPermisionTime />),
              content: 'Export ',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalenderSubHeader;
