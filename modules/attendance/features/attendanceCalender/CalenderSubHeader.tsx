import {
  ArrowDown2,
  Buildings2,
  Calendar,
  ExportSquare,
  Hierarchy3,
  People,
  Profile,
} from 'iconsax-reactjs';
import AppDropDown from '@hrbox/uikit/components/AppDropDown';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import AddPermisionTime from '@module/attendance/features/modals/AddPermisionTime';

import { AppButton } from '@hrbox/uikit/components';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@heroui/react';

const CalenderSubHeader = () => {
  const years = [
    { key: '2025', label: '2025', icon: <Calendar size={22} /> },
    { key: '2024', label: '2024', icon: <Calendar size={22} /> },
    { key: '2023', label: '2023', icon: <Calendar size={22} /> },
  ];
  const month = [
    { key: 'Januray', label: 'Januray', icon: <Calendar size={22} /> },
    { key: 'February', label: 'February', icon: <Calendar size={22} /> },
    { key: 'March', label: 'March', icon: <Calendar size={22} /> },
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
              radius: 'sm',
              startContent: (
                <span>
                  <Profile size={18} />
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
              radius: 'sm',
              className: isTrafficCalender?'shadow-none text-white':"shadow-none text-black",
              startContent: (
                <span>
                  <People size={18} />
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
              EndIcon:<ArrowDown2 size={20} />,
              startIcon:<Calendar size={22}/>,
              className: 'border-1 border-primary px-3 py-2 gap-2 rounded-lg',
            }}
          />{' '}
          <AppDropDown
            props={{
              title: '2025',
              item: years,
              startIcon:<Calendar size={22} />,
              EndIcon:<ArrowDown2 size={20}/>,
              className: 'border-1 border-primary px-xl rounded-lg',
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              variant: 'solid',
              radius: 'sm',
              className: 'shadow-none border-1 border-solid border-primary',
              startContent: (
                <span>
                  <ExportSquare size={20} />
                </span>
              ),
              onPress: () => openModal('confirm', 'AddPermisionTime', <AddPermisionTime />,undefined,"3xl","Add Permision Time",<Hierarchy3 color="white"/>),
              content: 'Export ',
            }}
          />
        </div>
      </div>
      {isTrafficCalender?
        (
      <div className="flex flex-row items-center justify-between mt-3">
        <div className="flex flex-row items-center gap-5">
          <Avatar className="w-[40px] h-[40px]" radius="md" src="/images/profile.png"/>
          <div className="flex flex-col gap-1">
            <p className='!text-sm font-open-sans'>Zahra Pakniyat</p>
            <div className="flex justify-start items-center">
              <div className='bg-[#DCF0F940] rounded-lg border border-primary-50 px-1 '>
              <p className="font-open-sans !text-[10px] !text-center !text-primary-400 ">UiUx Designer</p>
              </div>
              </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <AppDropDown props={{
            title:"Person",
            item:month,
            className: 'border-1 border-primary px-xl text-center rounded-lg',
            startIcon:<Profile size={22}/>,
            EndIcon:<ArrowDown2 size={20}/>,
          }}/>
          <AppDropDown props={{
            title:"Department/Unit",
            item:month,
            className: 'border-1 border-primary  text-center flex justify-center rounded-lg ',
            startIcon:<Buildings2 size={22}/>,
            EndIcon:<ArrowDown2 size={20}/>,
          }}/>
        </div>
      </div>
        ):null
      }
      </div>
  );
};

export default CalenderSubHeader;
