import { AppButton, AppInput, AppModal, AppTextArea } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';

const EducationModals = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Degree Level',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Educational Institution',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'University Type',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Field of Study',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Thesis Title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'GPA',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'From Year',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'To Year',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Province',
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
  );
};

export default EducationModals;
