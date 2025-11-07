import AllocationSubheader from '@module/attendance/features/Allocation/AllocationSubheader';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';
import { GlobalEdit, LocationAdd, Refresh2, Scan } from 'iconsax-react';
import LocationAllocationModal from '@module/attendance/features/modals/LocationAllocationModal';
import IpAllocationModal from '@module/attendance/features/modals/IpAllocationModal';
import FaceAllocationModal from '@module/attendance/features/modals/FaceAllocationModal';
import React from 'react';

function CreateAllocationSubHeaderWithHook(title:string,modalComponent:React.ComponentType,icon:React.ReactNode) {
  const Wrapper = (props:any) => {
    return <AllocationSubheader
      {...props}
      modalComponent={modalComponent}
      title={title}
      icon={icon}
    />;
  };
  Wrapper.displayName=title;
  return Wrapper;
}

export const ShiftAllocationSubheader = CreateAllocationSubHeaderWithHook('ShiftAllocation',ShiftAllocationModal,<Refresh2 color='white' size={18}/>);
export const LocationAllocationSubheader=CreateAllocationSubHeaderWithHook('LocationAllocation',LocationAllocationModal,<LocationAdd color='white' size={18}/>);
export const IpAllocationSubheader=CreateAllocationSubHeaderWithHook('IpAllocation',IpAllocationModal,<GlobalEdit color='white' size={18} />);
export const FaceRecognitionAssignment=CreateAllocationSubHeaderWithHook('FaceAllocation',FaceAllocationModal,<Scan color='white' size={18}/>);


