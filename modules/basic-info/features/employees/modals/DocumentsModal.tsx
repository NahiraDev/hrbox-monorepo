import {  AppButton, AppModal } from 'core/components';

const DocumentsModal = () => {
  return (
    <AppModal  size="3xl" title="Add New On-Duty Health Records">
      <AppModal.Body>
        <div className="bg-primary-400">
          no data
        </div>
      </AppModal.Body>
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
    </AppModal>
  );
};

export default DocumentsModal;
