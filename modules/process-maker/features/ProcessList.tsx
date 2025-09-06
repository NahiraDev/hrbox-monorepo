import { Add, Hierarchy3, SearchNormal, Setting4 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import AppTable from '../../../core/components/AppTable';
import { AppButton } from '../../../core';

import NewOneModal from './modals';

export default function ProcessMaker() {
  const [isopenModal, setIsopenModal] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row-reverse w-full justify-between ">
        <div className={`flex ${i18n.language === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>
          <AppButton
            props={{
              className: ` px-[12px] py-[6px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] flex items-center ${i18n.language === 'en' ? 'flex-row' : 'flex-row-reverse'}`,
              onClick: () => setIsopenModal(true),
              color: 'bg-white',
            }}
          >
            <span className="mr-2">
              <Add />
            </span>
            {t('add_new_one')}
          </AppButton>
          <NewOneModal buttonText="submit" isOpen={isopenModal} onClose={() => setIsopenModal(false)} />

          <AppButton
            props={{
              className:
                'p-[8px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] mx-[4px]',
              color: 'bg-white',
            }}
          >
            <Setting4 />
          </AppButton>
          <AppButton
            props={{
              className: 'p-[8px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px]',
              color: 'bg-white',
            }}
          >
            <SearchNormal />
          </AppButton>
        </div>
        <div className="flex">
          <AppButton
            props={{
              className: `px-[12px] py-[6px] rounded-[8px] text-white flex items-center`,
              color: 'bg-[#0A9AD7]',
            }}
          >
            {' '}
            <span className={`${i18n.language === 'en' ? 'mr-[8px]' : 'ml-[8px]'}`}>
              <Hierarchy3 />
            </span>
            {t('processes')}
          </AppButton>
        </div>
      </div>
      <AppTable columns={columns} data={sampleData} />
    </div>
  );
}
