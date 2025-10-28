import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import { Hierarchy3, Scan } from 'iconsax-react';
import { useModalContext } from '@core/context';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';

const FaceAllocationSubheader=()=>{
  const {openModal}=useModalContext();
  return(
    <>
    <AllocationSubheader title="Face Recognition Assignment" titleIcon={<Scan size={18}/>} onModalOpen={()=>{openModal('confirm',"ShiftAllocationModal",<ShiftAllocationModal/>,null,'2xl','Add New One',<Hierarchy3 color='white'/>)}}/>
    </>
  )
}
export default FaceAllocationSubheader
