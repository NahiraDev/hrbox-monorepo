import { AppAutoComplete, AppButton, AppInput, AppModal } from '@core/components';
import { HeartEdit } from 'iconsax-react';
import { useModalContext } from '@core/context';

const AddNewOnDutyHealthRecords = () => {
  const { openModal } = useModalContext();
  return (
    // <AppModal icon={<HeartEdit color="white" />} size="3xl" title="Add New On-Duty Health Records">
      <>
        <AppModal.Body>
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-2 gap-x-10 gap-y-6">
              <AppAutoComplete
                props={{
                  className: ' border border-[#DCF0F9]',
                  label: 'title',
                  size: 'lg',
                  color: 'primary',
                  radius: 'lg',
                }}
              />
              <AppInput
                props={{
                  className: ' border border-[#DCF0F9]',
                  label: 'Amount',
                  size: 'lg',
                  color: 'primary',
                  radius: 'lg',
                }}
              />
              <AppInput
                props={{
                  className: ' border border-[#DCF0F9]',
                  label: 'Amount',
                  size: 'lg',
                  color: 'primary',
                  radius: 'lg',
                }}
              />
            </div>
          </div>
        </AppModal.Body>
        <AppModal.Footer>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              variant: 'light',
              onPress: () => openModal('delete', undefined),
              content: <span>Cancle</span>,
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
              content: <span>Submit</span>,
              className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
            }}
          />
        </AppModal.Footer>
      </>
    // </AppModal>
  );
};

export default AddNewOnDutyHealthRecords;
