import { AppButton, AppSearchInput } from '@core/components';
import { Add, ArrowLeft2, Refresh, Refresh2 } from 'iconsax-react';
import { NewOneModal } from '@module/process-maker/features/modals';

const AllocationSubheader = () => {
  return(
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center">
          <span><ArrowLeft2/></span>
          <AppButton props={{
            content:'Shift Allocation',
            size:'sm',
            className:'bg-primary-400 text-white',
            startContent:<span><Refresh size={18}/></span>,
          }}/>
        </div>
        <div className="flex flex-row gap-2.5">
          <AppSearchInput />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              startContent: <Add />,
              className: 'border-1 border-primary',
              content: 'Add new One',
            }}
          />
        </div>
      </div>
    </>
  )
}
export default AllocationSubheader;
