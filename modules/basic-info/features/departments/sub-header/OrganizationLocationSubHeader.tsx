import { AppButton, useModalContext } from '@root/core';
import { Add, Location, SearchNormal1 } from 'iconsax-react';
import { OrganizationLocationModal } from '@module/basic-info/features/departments/modals/OrganizationLocationModal';

const OrganizationLocationSubHeader = (props: any) =>{
  const { openModal } = useModalContext();

  return (
    <div className='flex items-center justify-between'>
      <div>
        <div className='bg-primary-400 shadow-theme-sm flex w-fit items-center gap-2 rounded-lg px-3 py-1.5'>
          {props.icon && <props.icon color='#fff' />}
          <span className='!text-xl text-white'>{props.name}</span>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <AppButton
          props={{
            className: "border border-primary-400 p-2",
            size: 'lg',
            radius: 'lg',
            isIconOnly: true,
            onPress: () => '',
            content: (
              <span>
                <SearchNormal1 size='24' />
              </span>
            ),
          }}
        />
        <AppButton
          props={{
            className: 'border border-primary-400 px-3 py-1.5',
            size: 'lg',
            radius: 'lg',
            variant: 'light',
            onPress: () =>
              openModal(
                'edit',
                '',
                <OrganizationLocationModal />,
                undefined,
                '3xl',
                'Organizational Locations',
                <Location className='text-white' />
              ),
            content: (
              <div className='flex items-center gap-2'>
                <Add size='24' />
                <span className='!text-[16px] text-secondary-1000'>Add New One</span>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default OrganizationLocationSubHeader;
