import { AppAutoComplete, AppButton, AppModal, AppTextArea } from 'core/components';
import { Add, Location } from 'iconsax-react';
import { useModalContext } from 'core/context';
import { Avatar } from '@heroui/react';
import { UserLocation } from '../../../features/common';

export const OrgLocation = () => {
  const { openModal } = useModalContext();

  return (
    <AppModal icon={<Location color="white" />} size="3xl" title="Organizational Locations">
      <AppModal.Body>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div>
              <Avatar size="lg" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-secondary-1000">Location Photo</span>
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  color: 'white',
                  variant: 'solid',
                  isIconOnly: true,
                  onPress: () => openModal('edit', undefined),
                  content: (
                    <div className='flex items-center gap-1'>
                      <Add className="text-primary-600" size="20" />
                      <span className="text-primary-600 text-sm">Add Photo</span>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Depatments Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Depatments Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Depatments Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Depatments Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Depatments Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>
        <div>
          <AppTextArea
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Descriptions*',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppTextArea
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Descriptions*',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <UserLocation />
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => openModal('delete', undefined),
            content: <span>Cancel</span>,
            className:
              'text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => console.log('a'),
            content: <span>Save Changes</span>,
            className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};
