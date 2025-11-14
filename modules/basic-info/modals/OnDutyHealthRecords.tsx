import { AppAutoComplete, AppInput, AppModal } from '@hrbox-monorepo/UIKit/components';
import { HeartEdit } from 'iconsax-reactjs';

const OnDutyHealthRecords = () => {
  return (
    // <AppModal icon={<HeartEdit color="white" />} size="3xl" title="On-Duty Health Records">
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
    // </AppModal>
  );
};

export default OnDutyHealthRecords;
