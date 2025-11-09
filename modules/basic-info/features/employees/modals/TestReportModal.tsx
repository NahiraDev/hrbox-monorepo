import {  AppInput, AppModal } from '@hrbox/uikit/components';
import {  TickSquare } from 'iconsax-react';

export const TestReportModal = () => {

  return (
    // <AppModal icon={<TickSquare color="white" />} size="3xl" title="Test Result">
      <AppModal.Body>
        <div className='grid grid-cols-2 gap-10'>
          <AppInput
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Title',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppInput
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Type',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppInput
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Full name',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
          <AppInput
            props={{
              className: ' border border-[#DCF0F9]',
              label: 'Test Grad',
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
        </div>

      </AppModal.Body>
    // </AppModal>
  );
};
