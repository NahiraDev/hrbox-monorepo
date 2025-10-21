import { TimerStart } from 'iconsax-react';

import { EntryExitData } from '@module/attendance/app/mock';

import { AppTable } from '@core/components';
import { AppButton } from '@core/components';
import { useModalContext } from '@core/context';
import UserLocationModal from '@module/attendance/features/modals/UserLocationModal';

const EntryExit = () => {
  const { openModal } = useModalContext();

  return (
    <>
      <div className="w-full h-full flex ">
        <AppTable data={EntryExitData} />
      </div>
    </>
  );
};

export default EntryExit;
