import { ArrowDown2, Buildings2, Calendar, Export, Hierarchy3, People, Profile } from 'iconsax-react';
import AppDropDown from '@core/components/AppDropDown';
import { useModalContext } from '@core/context';
import AddPermisionTime from '@module/attendance/features/modals/AddPermisionTime';
import PersonnelReportModal from '@module/attendance/features/modals/PersonnelReportModal';

import { AppButton } from '@core/components';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@heroui/react';

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
    <div className="w-full flex flex-col ">
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
              onClick:()=>navigate('/attendance/attendance-calender'),
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
              onPress: () => openModal('confirm', 'AddPermisionTime', <AddPermisionTime />,undefined,"2xl","Add Permision Time",<Hierarchy3 color="white"/>),
              content: 'Export ',
            }}
          />
        </div>
      </div>
      {isTrafficCalender?
        (
      <div className="flex flex-row items-center justify-between mt-3">
        <div className="flex flex-row items-center gap-5">
          <Avatar className="w-[50px] h-[50px]" radius="md" src="/images/profile.png"/>
          <div className="flex flex-col gap-1">
            <h1>Zahra Pakniyat</h1>
            <div className="bg-primary-50 px-[4px] py-[1.5px] text-primary-400 rounded-md text-center flex items-center">
              <p className="font-sans font-normal text-xs">UiUx Designer</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <AppDropDown props={{
            title:"Person",
            item:month,
            className: 'border-1 border-primary px-xl ',
            startIcon:<Profile/>,
            EndIcon:<ArrowDown2/>,
          }}/>
          <AppDropDown props={{
            title:"Department/Unit",
            item:month,
            className: 'border-1 border-primary px-xl ',
            startIcon:<Buildings2/>,
            EndIcon:<ArrowDown2/>,
          }}/>
        </div>
      </div>
        ):null
      }
      </div>
  );
};

export default CalenderSubHeader;
