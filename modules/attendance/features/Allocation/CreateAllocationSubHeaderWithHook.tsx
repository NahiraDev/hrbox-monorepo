import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';
import { GlobalEdit, LocationAdd, Refresh2, Scan } from 'iconsax-react';
import LocationAllocationModal from '@module/attendance/features/modals/LocationAllocationModal';
import IpAllocationModal from '@module/attendance/features/modals/IpAllocationModal';
import FaceAllocationModal from '@module/attendance/features/modals/FaceAllocationModal';

function CreateAllocationSubHeaderWithHook(name:string , ModalComponent:React.ComponentType,SubheaderIcon:React.ComponentType<any>){
  const Wrapper = (props:any) => {
    // const [trigger]=useHook();
    return <AllocationSubheader {...props} name={name} subheaderIcon={SubheaderIcon} modalComponent={ModalComponent} />;
  }
  Wrapper.displayName=name;
  return Wrapper;
}

export const ShiftAllocationSubheader=CreateAllocationSubHeaderWithHook('ShiftAllocation',ShiftAllocationModal,Refresh2);
export const LocationAllocationSubheader=CreateAllocationSubHeaderWithHook('LocationAllocation',LocationAllocationModal,LocationAdd);
export const IpAllocationSubheader=CreateAllocationSubHeaderWithHook('IpAllocation',IpAllocationModal,GlobalEdit);
export const FaceRecognitionAssignment=CreateAllocationSubHeaderWithHook('FaceAllocation',FaceAllocationModal,Scan);


