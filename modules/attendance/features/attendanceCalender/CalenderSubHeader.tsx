import { ArrowDown2, Calendar, Export, Hierarchy3, People, Profile } from 'iconsax-react';
import AppDropDown from '@core/components/AppDropDown';
import { useModalContext } from '@core/context';
import AddPermisionTime from '@module/attendance/features/modals/AddPermisionTime';
import PersonnelReportModal from '@module/attendance/features/modals/PersonnelReportModal';

import { AppButton } from '@core/components';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const {t}=useTranslation();
  const navigate=useNavigate();
  const location = useLocation();
  const isTrafficCalender = location.pathname === '/attendance/traffic-calender';
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row justify-between">
          <AppButton
            props={{
              color:isTrafficCalender?"white":"primary",
              size: 'md',
              radius: 'lg',
              startContent: (
                <span>
                  <Profile />
                </span>
              ),
              className:isTrafficCalender? "text-black":"text-white",
              content: t('Personal_attendance_calendar'),
            }}
          />
          <AppButton
            props={{
              color: isTrafficCalender?"primary":"white",
              size: 'md',
              className: isTrafficCalender?'shadow-none text-white':"shadow-none text-black",
              startContent: (
                <span>
                  <People />
                </span>
              ),
              // onPress: () => openModal('confirm','PersonnelReport',<PersonnelReportModal/>,undefined,"2xl","Add Permision Time", <Hierarchy3 color="white"/>),
              onClick:()=>navigate('/attendance/traffic-calender'),
              content: 'Group attendance calendar',
            }}
          />
        </div>
        <div className="flex flex-row justify-between gap-2">
          <AppDropDown
            props={{
              item: month,
              title: 'Month',
              EndIcon:<ArrowDown2/>,
              className: 'border-1 border-primary px-xl ',
            }}
          />{' '}
          <AppDropDown
            props={{
              title: '2025',
              item: years,
              EndIcon:<ArrowDown2/>,
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
              onPress: () => openModal('confirm', 'AddPermisionTime', <AddPermisionTime />,[],"2xl","Add Permision Time",<Hierarchy3 color="white"/>),
              content: 'Export ',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalenderSubHeader;
