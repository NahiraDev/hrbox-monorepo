import AllocationSubheader from '@hrbox/modules/attendance/subheaders/AllocationSubheader';
import ShiftAllocationModal from '@hrbox/modules/attendance/modals/ShiftAllocationModal';
import { GlobalEdit, LocationAdd, Refresh2, Scan } from 'iconsax-reactjs';
import LocationAllocationModal from '@hrbox/modules/attendance/modals/LocationAllocationModal';
import IpAllocationModal from '@hrbox/modules/attendance/modals/IpAllocationModal';
import FaceAllocationModal from '@hrbox/modules/attendance/modals/FaceAllocationModal';
import React from 'react';

function CreateAllocationSubHeaderWithHook(title:string,modalComponent:React.ComponentType,icon:React.ReactNode,id:string) {
  const Wrapper = (props:any) => {
    return <AllocationSubheader
      {...props}
      modalComponent={modalComponent}
      title={title}
      icon={icon}
      id={id}
    />;
  };
  Wrapper.displayName=title;
  return Wrapper;
}

export const ShiftAllocationSubheader = CreateAllocationSubHeaderWithHook('shiftallocation',ShiftAllocationModal,<Refresh2 color='white' size={18}/> , "shift-allocation");
export const LocationAllocationSubheader=CreateAllocationSubHeaderWithHook('locationallocation',LocationAllocationModal,<LocationAdd color='white' size={18}/> , "location-allocation");
export const IpAllocationSubheader=CreateAllocationSubHeaderWithHook('ipallocation',IpAllocationModal,<GlobalEdit color='white' size={18} />,"ip-allocation-form");
export const FaceRecognitionAssignment=CreateAllocationSubHeaderWithHook('faceallocation',FaceAllocationModal,<Scan color='white' size={18}/> , "face-allocation-form");


