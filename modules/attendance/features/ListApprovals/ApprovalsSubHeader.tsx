import { AppButton } from '@root/core';
import { Key  } from 'iconsax-react';

const ApprovalsSubHeader=()=>{
  return(
    <>
      <div className="flex flex-row-reverse justify-end ">
        <div className="flex">
          <AppButton
            props={{
              color: 'primary',
              size: 'md',
              radius: 'lg',
              content: 'List of  Approvals',
              className: 'text-white',
              startContent: <Key />,
            }}
          />
        </div>
      </div>
    </>
  )
}
export default ApprovalsSubHeader
