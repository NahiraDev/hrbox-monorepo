import {  AppButton, AppModal } from '@core/components';
import { Avatar } from '@heroui/react';

const DocumentsModal = () => {
  return (

      <AppModal.Body>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <Avatar radius="sm" size="lg" />
            <div className="flex flex-col gap-1">
              <span>Ali Asadi</span>
              <span>Identity Card</span>
            </div>
          </div>
          <div className="flex items-center justify-center bg-[#DCF0F966] rounded-lg">
            <span className="p-22 ">
              No Data
            </span>
          </div>

        <AppModal.Footer>
          <AppButton
            props={{
              size: 'xs',
              radius: 'sm',
              variant: 'light',
              content: <span>Upload File</span>,
              className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg ',
            }}
          />
        </AppModal.Footer>
        </div>
      </AppModal.Body>
  );
};

export default DocumentsModal;
