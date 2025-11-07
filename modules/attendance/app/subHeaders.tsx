import { lazyLoad } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';
import {
  FaceRecognitionAssignment,
  IpAllocationSubheader, LocationAllocationSubheader,
  ShiftAllocationSubheader,
} from '@module/attendance/features/Allocation/CreateAllocationSubHeaderWithHook';
import { Key, PasswordCheck, Refresh } from 'iconsax-react';

const DashboardSubHeader = lazyLoad(() => import('@module/attendance/features/dashboard/DashboardSubHeader'));
const EntryExitSubHeader = lazyLoad(() => import('@module/attendance/features/registration/EntryExitSubHeader'));
const CalenderSubHeader = lazyLoad(() => import('@module/attendance/features/attendanceCalender/CalenderSubHeader'));
const ApprovalsSubHeader = lazyLoad(() => import('@module/attendance/features/ListApprovals/ApprovalsSubHeader'));

export const AttendanceSubHeaders: any = [
  {
    path: AttendancePath.Dashboard,
    component: DashboardSubHeader,
  },
  {
    path: AttendancePath.EntryExitRegistration,
    component: EntryExitSubHeader,
    props:{
      title:'My Time',
      icon:<PasswordCheck size={18} color='white' />,
    }
  },
  {
    path: AttendancePath.AttendanceCalenders,
    component: CalenderSubHeader,
  },{
    path: AttendancePath.TrafficCalender,
    component: CalenderSubHeader,
  },
  {
    path: AttendancePath.ListOfApprovals,
    component:ApprovalsSubHeader ,
    props:{
      title:'List of  Approvals',
      icon:<Key color='white' size={18} />
    }
  },{
    path: AttendancePath.ShiftAllocation,
    component:ShiftAllocationSubheader,
    props:{
      title:'Shift Allocation',
      icon: <Refresh color='white' size={18}/>
    }
  },{
    path: AttendancePath.IpAllocation,
    component:IpAllocationSubheader,
  },{
    path: AttendancePath.LocationAllocation,
    component:LocationAllocationSubheader,
  },{
    path: AttendancePath.FaceAllocation,
    component:FaceRecognitionAssignment,
  },
];
