import { Add, Chart, SearchNormal, Setting4 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { AppButton } from '../../../core';

const Dashboard = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse justify-between ">
        <div className={i18n.language === 'en' ? 'flex flex-row-reverse' : 'flex flex-row'}>
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              content: 'Add new One',
              startContent: <Add />,
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              content: <Setting4 />,
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              content: <SearchNormal />,
            }}
          />
        </div>
        <div className="flex">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              content: 'Dashboard',
              startContent: <Chart />,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
