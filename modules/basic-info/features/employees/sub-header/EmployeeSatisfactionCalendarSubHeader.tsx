import { AppAutoComplete, AppButton } from '@root/core';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { Add, ArrowLeft2, Edit, Hierarchy3, SearchNormal, Setting4, Trash } from 'iconsax-react';
import { OrganizationLocationModal } from '@module/basic-info/features/departments/modals/OrganizationLocationModal';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '@root/core';
import AppDropDown from '@core/components/AppDropDown';
const EmployeeSatisfactionCalendarSubHeader = (props: any) => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between ">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-lg shadow-theme-sm px-3 py-1.5 w-fit cursor-pointer" onClick={() => navigate(BasicInfoPaths.AllEmployees)}>
            {props.icon && <props.icon />}
            <span className="!text-xl" >{props.name}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-primary-400 shadow-theme-sm px-3 py-1.5 w-fit cursor-pointer" onClick={() => navigate(BasicInfoPaths.EmployeeSatisfactionCalendar)}>
            {props.icon1 && <props.icon1 color="#fff" />}
            <span className="text-white !text-xl">{props.name1}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <AppAutoComplete
          props={{
            className: ' border border-[#DCF0F9]',
            label: 'title',
            size: 'lg',
            color: 'primary',
            radius: 'lg',
          }}
        />
        <AppAutoComplete
          props={{
            className: ' border border-[#DCF0F9]',
            label: 'title',
            size: 'lg',
            color: 'primary',
            radius: 'lg',
          }}
        />
      </div>
    </div>
  );
};

export default EmployeeSatisfactionCalendarSubHeader;
