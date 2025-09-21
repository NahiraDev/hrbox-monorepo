import { AppButton } from 'core/components';
import { Add, Chart, SearchNormal, Setting4 } from 'iconsax-react';

const DashboardSubHeader = () => {
  return (
    <>
      <div className="flex flex-row-reverse justify-between ">
        <div className="flex flex-row-reverse gap-2">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              content: 'Add new One',
              className: 'border-1 border-primary',
              startContent: <Add />,
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              className: 'border-1 border-primary',
              content: <Setting4 />,
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              className: 'border-1 border-primary',
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
    </>
  );
};

export default DashboardSubHeader;
