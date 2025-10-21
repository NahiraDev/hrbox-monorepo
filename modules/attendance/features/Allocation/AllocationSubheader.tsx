import { AppButton } from '@core/components';
import { ArrowLeft2, Refresh, Refresh2 } from 'iconsax-react';

const AllocationSubheader = () => {
  return(
    <>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-row gap-3 items-center ">
          <span><ArrowLeft2/></span>
          <AppButton props={{
            content:'Shift Allocation',
            size:'sm',
            className:'bg-primary-400 text-white',
            startContent:<span><Refresh size={18}/></span>,
          }}/>
        </div>
      </div>
    </>
  )
}
export default AllocationSubheader;
