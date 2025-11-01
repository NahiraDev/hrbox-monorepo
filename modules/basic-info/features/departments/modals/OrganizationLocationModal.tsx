import { AppAutoComplete, AppButton, AppModal, AppTextArea } from '@core/components';
import { Add, Location } from 'iconsax-react';
import { useModalContext } from '@core/context';
import { Avatar } from '@heroui/react';

export const OrganizationLocationModal = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-3">
            <div>
              <Avatar className='p-3.5 text-white' size="lg" radius="sm" color='primary' src="" />
            </div>
            <div className="flex flex-col text-center gap-3">
              <span className="!font-medium text-secondary-1000">Location Photo</span>
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  color: 'white',
                  variant: 'light',
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
              label: 'Location Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'URL',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Province  ',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'City',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppAutoComplete
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'HR Manager',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <AppTextArea
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Address*',
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
              'text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg ',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => console.log('a'),
            content: <span>Save Changes</span>,
            className: 'bg-primary text-white py-1.5 px-3 !text-xl rounded-lg ',
          }}
        />
      </AppModal.Footer>
    </>
  );
};
