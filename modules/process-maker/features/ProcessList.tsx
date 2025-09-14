import { Add, Hierarchy3, SearchNormal, Setting4 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import AppTable from '../../../core/components/AppTable';
import { AppButton, useModalContext } from '../../../core';

import { NewOneModal } from './modals';

export const ProcessMaker = () => {
  const { i18n } = useTranslation();
  const { openModal, isModalOpen } = useModalContext();

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row-reverse w-full justify-between ">
        <div className={`flex ${i18n.language === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>
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
      <AppTable columns={columns} data={sampleData} />
    </div>
  );
};
