import { AppButton, AppSearchInput } from '@core/components';
import { Add, ArrowLeft2, Hierarchy3, Refresh } from 'iconsax-react';
import { useModalContext } from '@core/context';
import IpAllocationModal from '@module/attendance/features/modals/IpAllocationModal';

const AllocationSubheader = () => {
  const {openModal}=useModalContext();
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
              onClick:()=> openModal ("confirm",'IpAllocationModal',<IpAllocationModal/>,null,"2xl","Add New One",<Hierarchy3 color="white"/>),
              content: 'Add new One',
            }}
          />
        </div>
      </div>
    </>
  )
}
export default AllocationSubheader;
