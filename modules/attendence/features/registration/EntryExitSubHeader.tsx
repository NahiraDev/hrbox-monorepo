import { AppButton } from 'core/components';
import { PasswordCheck } from 'iconsax-react';

const EntryExitSubHeader = () => {
  return (
    <>
      <div className="flex flex-row justify-between ">

        <div className="flex">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              variant: 'solid',
              content: 'My Time',
              startContent: <PasswordCheck />,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EntryExitSubHeader;
