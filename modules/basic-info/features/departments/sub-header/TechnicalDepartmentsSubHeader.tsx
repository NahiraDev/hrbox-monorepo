import { AppButton } from '@core/components';
import { ArrowLeft2, Category, Edit, Hierarchy3 } from 'iconsax-react';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { useNavigate } from 'react-router-dom';
import { useModalContext } from '@root/core';
import {
  OrganizationDepartmentModal
} from '@module/basic-info/features/departments/modals/OrganizationDepartmentModal';

const TechnicalDepartmentsSubHeader = (props: any) => {
  const navigate = useNavigate();
  const { openModal } = useModalContext();

  return (
    <div className="flex items-center justify-between ">
    <div className="flex items-center justify-between">
      <AppButton
        props={{
          className:'w-[24px] h-[24px]',
          size: 'lg',
          radius: 'sm',
          variant: 'light',
          isIconOnly: true,
          onPress:() => navigate(BasicInfoPaths.OrganizationDepartments),
          content: <ArrowLeft2 size='24'/>,
        }}
      />
      <div className="flex items-center gap-2 rounded-lg bg-primary-400 shadow-theme-sm px-3 py-1.5 w-fit">
        {props.icon && <props.icon color="#fff" />}
        <span className="text-white !text-xl">{props.name}</span>
      </div>
    </div>
      <div className="flex items-center gap-2">
        <AppButton
          props={{
            className: 'border border-primary-400 p-2',
            size: 'lg',
            radius: 'sm',
            isIconOnly: true,
            onPress: () => openModal('custom', "",<OrganizationDepartmentModal/> , undefined, '3xl',"Organization Departments", <Category className='text-white'/> ),
            content: (
              <span >
                <Edit size="24  " />
              </span>
            ),
          }}
        />
        <AppButton
          props={{
            className: 'border border-primary-400 px-3 py-1.5',
            size: 'lg',
            radius: 'sm',
            variant: 'light',
            onPress: () => "",
            content: (
              <div className="flex items-center gap-1.5">
                <Hierarchy3 size="24" />
                <span className="!text-[16px]">Chart Maker</span>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default TechnicalDepartmentsSubHeader;
