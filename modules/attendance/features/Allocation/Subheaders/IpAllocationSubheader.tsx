import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import { Global, Hierarchy3 } from 'iconsax-react';
import { useModalContext } from '@core/context';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';

const IpAllocationSubheader=()=>{
  const {openModal}=useModalContext();
  return(
    <>
    <AllocationSubheader title="Ip Allocation" titleIcon={<Global size={18}/>} onModalOpen={()=>{openModal('confirm',"ShiftAllocationModal",<ShiftAllocationModal/>,null,'2xl','Add New One',<Hierarchy3 color='white'/>)}}/>
    </>
  )
}
export default IpAllocationSubheader
