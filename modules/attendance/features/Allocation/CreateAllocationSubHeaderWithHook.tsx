import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';
import { Refresh2 } from 'iconsax-react';

function CreateAllocationSubHeaderWithHook(name:string , ModalComponent:React.ComponentType,SubheaderIcon:React.ComponentType<any>){
  const Wrapper = (props:any) => {
    // const [trigger]=useHook();
    return <AllocationSubheader {...props} name={name} subheaderIcon={SubheaderIcon} modalComponent={ModalComponent} />;
  }
  Wrapper.displayName=name;
  return Wrapper;
}

export const ShiftAllocationSubheader=CreateAllocationSubHeaderWithHook('ShiftAllocation',ShiftAllocationModal,Refresh2);


