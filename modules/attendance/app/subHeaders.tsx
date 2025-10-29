import { lazyLoad } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';
import {
  IpAllocationSubheader,
  ShiftAllocationSubheader,
} from '@module/attendance/features/Allocation/CreateAllocationSubHeaderWithHook';
import { Refresh2 } from 'iconsax-react';
import ShiftAllocationModal from '@module/attendance/features/modals/ShiftAllocationModal';

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
  },{
    path: AttendancePath.ShiftAllocation,
    component:ShiftAllocationSubheader,
  },{
    path: AttendancePath.IpAllocation,
    component:IpAllocationSubheader,
  },
];
