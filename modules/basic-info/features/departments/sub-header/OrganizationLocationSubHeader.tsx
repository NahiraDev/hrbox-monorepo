import { AppButton, useModalContext } from '@root/core';
import { Add, Location, SearchNormal, Trash } from 'iconsax-react';
import { OrganizationLocationModal } from '@module/basic-info/features/departments/modals/OrganizationLocationModal';

const OrganizationLocationSubHeader = (props: any) =>{
  const { openModal } = useModalContext();

  return(
    <div className="flex items-center justify-between ">
      <div>
        <div className="flex items-center gap-2 rounded-md bg-primary-400 shdow-theme-sm px-3 py-1.5 w-fit">
          {props.icon && <props.icon color="#fff" />}
          <span className="text-white text-xl font-normal">{props.name}</span>
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
            variant: 'light',
            onPress: () => openModal('edit',"", <OrganizationLocationModal />, undefined, '2xl',"Organizational Locations",<Location className='text-white'/>),
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
  )
}

export default OrganizationLocationSubHeader;
