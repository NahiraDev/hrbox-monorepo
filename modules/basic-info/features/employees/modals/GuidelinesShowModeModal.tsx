import { AppInput, AppModal } from '@root/core';
import React from 'react';

export const GuidelinesShowModeModal: React.FC = () => {
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
            mode:'show'
          }}
        />
      </AppModal.Body>
    </>
  )
}
