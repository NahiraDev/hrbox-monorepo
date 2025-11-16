import { AppButton, AppInput, AppModal } from '@root/core';
import React from 'react';

export const GuidelinesModal: React.FC = () => {
  return (
    <>
<AppModal.Body>
  <AppInput
    props={{
      className: 'border border-[#DCF0F9] w-full',
      label: 'Form',
      value:"content",
      size: 'lg',
      color: 'primary',
      radius: 'lg',
      mode:'edit'
    }}
  />
</AppModal.Body>
  <AppModal.Footer>
    <AppButton
      props={{
        radius: 'sm',
        variant: 'light',
        // onPress: () => openModal('delete', undefined),
        content: <span>Cancel</span>,
        className:
          'py-2 px-4 !text-lg rounded-lg text-secondary-800 !font-medium hover:!bg-red-500 hover:text-white transition-all duration-200',
      }}
    />
    <AppButton
      props={{
        size: 'xs',
        radius: 'sm',
        variant: 'light',
        onPress: () => console.log('a'),
        content: <span>Submit</span>,
        className: 'bg-primary text-white py-2 px-4  !text-xl rounded-lg ',
      }}
    />
  </AppModal.Footer>
      </>
  )
}
