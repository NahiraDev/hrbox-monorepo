import { AppButton, AppInput, AppModal, AppTextArea } from 'core/components';
import { Category } from 'iconsax-react';
import { useModalContext } from 'core/context';

const colors = ['#000000', '#A61111', '#F4D082', '#05856F', '#0ED2F7', '#2F80ED', '#DB5918', '#9F9C90'];

export const OrgLocation = () => {
  const { openModal } = useModalContext();

  return (
    <AppModal icon={<Category color="white" />} size="3xl" title="O" >
      <AppModal.Body>
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between">
            <AppInput
              props={{
                className: ' border border-[#DCF0F9]',
                label: 'Depatments Title',
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium ">
                <span>Depatments Color</span>
              </div>
              <div className="flex gap-2.5">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-2 hover:scale-125 transition duration-100 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
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

