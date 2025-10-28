import { AppButton, useModalContext } from '@root/core';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import {
  Add,
  ArrowLeft2,
  Edit,
  Filter,
  Hierarchy3,
  SearchNormal,
  Setting4,
  Trash,
} from 'iconsax-react';
import { OrganizationLocationModal } from '@module/basic-info/features/departments/modals/OrganizationLocationModal';
import { useNavigate } from 'react-router-dom';
import FilterCalenderModal from '@module/basic-info/features/employees/modals/FilterCalenderModal';

const EmployeesSubHeader = (props: any) => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between ">
      <div className="flex gap-2">
        <div className="flex items-center gap-2 rounded-md bg-primary-400 shdow-theme-sm px-3 py-1.5 w-fit cursor-pointer" onClick={() => navigate(BasicInfoPaths.AllEmployees)}>
          {props.icon && <props.icon color="#fff" />}
          <span className="text-white text-xl font-normal " >{props.name}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-primary-500 shdow-theme-sm px-3 py-1.5 w-fit cursor-pointer" onClick={() => navigate(BasicInfoPaths.EmployeeSatisfactionCalendar)}>
          {props.icon && <props.icon color="#fff" />}
          <span className="text-white text-xl font-normal "  >{props.name}</span>
      </div>
      </div>
      <div className="flex items-center gap-2">
        <AppButton
          props={{
            className: 'border border-primary-400',
            size: 'lg',
            radius: 'sm',
            isIconOnly: true,
            onPress: () => "",
            content: (
              <span >
                <SearchNormal size="28" />
              </span>
            ),
          }}
        />
        <AppButton
          props={{
            className: 'border border-primary-400',
            size: 'lg',
            radius: 'sm',
            isIconOnly: true,
            onPress: () => openModal('edit',"", <FilterCalenderModal/>,undefined,"sm","Filter", <Filter className='text-white'/> ),
            content: (
              <span >
                <Setting4 size="28" />
              </span>
            ),
          }}
        />
        <AppButton
          props={{
            className: 'border border-primary-400',
            size: 'lg',
            radius: 'sm',
            variant: 'light',
            onPress: () => openModal('edit',"", <OrganizationLocationModal />, undefined, '2xl',"Do you want to remove it?",<Trash className='text-white'/>),
            content: (
              <div className="flex items-center gap-4">
                <Add size="28" />
                <span className="!text-lg">Add New One</span>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default EmployeesSubHeader;
