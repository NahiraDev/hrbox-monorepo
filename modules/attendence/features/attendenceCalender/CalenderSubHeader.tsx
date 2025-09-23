import { Export, People, Profile } from 'iconsax-react';

import { AppButton } from '../../../../core/components';

const CalenderSubHeader = () => {
  return (
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row justify-between">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius:'lg',
              startContent: (
                <span>
                  <Profile />
                </span>
              ),
              content: 'Personal attendence calendar',
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              className: 'shadow-none',
              startContent: (
                <span>
                  <People />
                </span>
              ),
              content: 'Group attendence calendar',
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <AppButton
            props={{
              color: 'white',
              variant: 'solid',
              size: 'md',
              startContent: (
                <span>
                  <Profile />
                </span>
              ),
              content: 'Personal attendence calendar',
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              variant: 'solid',
              radius: 'lg',
              className: 'shadow-none border-1 border-solid border-primary',
              startContent: (
                <span>
                  <Export />
                </span>
              ),
              content: 'Export ',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CalenderSubHeader;
