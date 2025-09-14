import { Add, Hierarchy3, SearchNormal, Setting4 } from 'iconsax-react';

import { AppButton, useModalContext } from '../../../core';

import { NewOneModal } from './modals';

const ProcessListSubHeader = () => {
  const { openModal, isModalOpen } = useModalContext();

  return (
    <div className="flex flex-row-reverse w-full justify-between">
      <div className="flex">
        <AppButton
          props={{
            color: 'primary',
            size: 'md',
            radius: 'lg',
            startContent: <Add />,
            onPress: () => openModal('confirm', 'NewOneModal'),
            content: 'Add new One',
          }}
        />
        {isModalOpen('confirm', 'NewOneModal') && <NewOneModal />}
        <AppButton
          props={{
            color: 'bg-white',
            size: 'md',
            radius: 'lg',
            startContent: <Setting4 />,
          }}
        />
        <AppButton
          props={{
            color: 'bg-white',
            size: 'md',
            radius: 'lg',
            startContent: <SearchNormal />,
          }}
        />
      </div>
      <div className="flex">
        <AppButton
          props={{
            color: 'primary',
            size: 'md',
            radius: 'lg',
            startContent: <Hierarchy3 />,
          }}
        />
      </div>
    </div>
  );
};

export default ProcessListSubHeader;
