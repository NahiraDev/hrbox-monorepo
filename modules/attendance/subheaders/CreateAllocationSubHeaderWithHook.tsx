import AllocationSubheader from '@hrbox/modules/attendance/subheaders/AllocationSubheader';
import ShiftAllocationModal from '@hrbox/modules/attendance/modals/ShiftAllocationModal';
import { GlobalEdit, LocationAdd, Refresh2, Scan } from 'iconsax-reactjs';
import LocationAllocationModal from '@hrbox/modules/attendance/modals/LocationAllocationModal';
import IpAllocationModal from '@hrbox/modules/attendance/modals/IpAllocationModal';
import FaceAllocationModal from '@hrbox/modules/attendance/modals/FaceAllocationModal';
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

export const ShiftAllocationSubheader = CreateAllocationSubHeaderWithHook('shiftallocation',ShiftAllocationModal,<Refresh2 color='white' size={18}/>);
export const LocationAllocationSubheader=CreateAllocationSubHeaderWithHook('locationallocation',LocationAllocationModal,<LocationAdd color='white' size={18}/>);
export const IpAllocationSubheader=CreateAllocationSubHeaderWithHook('ipallocation',IpAllocationModal,<GlobalEdit color='white' size={18} />);
export const FaceRecognitionAssignment=CreateAllocationSubHeaderWithHook('faceallocation',FaceAllocationModal,<Scan color='white' size={18}/>);


