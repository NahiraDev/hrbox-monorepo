import { Add, Hierarchy3, SearchNormal, Setting4 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import AppTable from '../../../core/components/AppTable';
import { ProceeModalNew } from '../features/modals/ProcessModalNew';

export default function ProcessMaker() {
  const [isopenModal, setIsopenModal] = useState(false);
  const { t, i18n } = useTranslation();
  const sampleData = [
    {
      id: 1,
      title: t('process_a'),
      Process_Builder: t('builder'),
      Creation_Date: '2025-01-01',
      Last_Update_Date: '2025-04-04',
      status: t('active'),
      Category: 'bpmn2',
    },
    {
      id: 2,
      title: t('process_a'),
      Process_Builder: t('builder'),
      Creation_Date: '2025-02-01',
      Last_Update_Date: '2025-04-04',
      status: t('inactive'),
      Category: 'workflow',
    },
  ];
  const columns = [
    { key: 'id', label: t('id') },
    { key: 'title', label: t('title') },
    { key: 'Process_Builder', label: t('Process_Builder') },
    { key: 'Creation_Date', label: t('Creation_Date') },
    { key: 'Last_Update_Date', label: t('Last_Update_Date') },
    { key: 'status', label: t('Status') },
    { key: 'Category', label: t('category') },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-row-reverse w-full justify-between ">
        <div className={`flex ${i18n.language === 'en' ? 'flex-row-reverse' : 'flex-row'}`}>
          <button
            className={` px-[12px] py-[6px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] dark:bg-[#01101A] rounded-[8px] bg-white flex items-center ${i18n.language === 'en' ? 'flex-row' : 'flex-row-reverse'} `}
            onClick={() => setIsopenModal(true)}
          >
            <span className="mr-2">
              <Add />
            </span>
            {t('add_new_one')}
          </button>
          <ProceeModalNew buttonText="submit" isOpen={isopenModal} onClose={() => setIsopenModal(false)} />

          <button className="p-[8px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] mx-[4px] dark:bg-[#01101A] bg-white">
            <Setting4 />
          </button>
          <button className="p-[8px] border-[1px] border-solid dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] dark:bg-[#01101A] bg-white">
            <SearchNormal />
          </button>
        </div>
        <div className="flex">
          <button
            className={`px-[12px] py-[6px] rounded-[8px] text-white bg-[#0A9AD7] flex items-center dark:bg-[#0D4D6A]   `}
          >
            {' '}
            <span className={`${i18n.language === 'en' ? 'mr-[8px]' : 'ml-[8px]'}`}>
              <Hierarchy3 />
            </span>
            {t('processes')}
          </button>
        </div>
      </div>
      <AppTable columns={columns} data={sampleData} />
    </div>
  );
}
