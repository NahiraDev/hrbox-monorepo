import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import { Hierarchy3, Location } from 'iconsax-react';
import { useModalContext } from '@core/context';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';

const LocationAllocationSubheader=()=>{
  const {openModal}=useModalContext();
  return(
    <>
    <AllocationSubheader title="Location Allocation" titleIcon={<Location size={18}/>} onModalOpen={()=>{openModal('confirm',"ShiftAllocationModal",<ShiftAllocationModal/>,null,'2xl','Add New One',<Hierarchy3 color='white'/>)}}/>
    </>
  )
}
export default LocationAllocationSubheader
