import { lazyLoad } from '@core/routes';

import { AttendancePath } from '@module/attendance/app/paths';

const Dashboard = lazyLoad(() => import('@module/attendance/features/dashboard/Dashboard'));
const EntryExit = lazyLoad(() => import('@module/attendance/features/registration/EntryExit'));
const AttendanceCalender = lazyLoad(() => import('@module/attendance/features/attendanceCalender/AttendanceCalenders'));
const TrafficCalender = lazyLoad(() => import('@module/attendance/features/attendanceCalender/TrafficCalender'));
const ExportPage = lazyLoad(() => import('@module/attendance/features/Export/ExportPage'));
const ListOfApprovals = lazyLoad(() => import('@module/attendance/features/ListApprovals/ListApprovals'));
const ShiftAllocation = lazyLoad(() => import('@module/attendance/features/Allocation/ShiftAllocation'));
const FaceAllocation = lazyLoad(() => import('@module/attendance/features/Allocation/FaceAllocation'));
const IpAllocation = lazyLoad(() => import('@module/attendance/features/Allocation/IpAllocation'));
const LocationAllocation = lazyLoad(() => import('@module/attendance/features/Allocation/LocationAllocation'));

export const AttendanceContents: any = [
  {
    path: AttendancePath.Dashboard,
    component: Dashboard,
  },
  {
    path: AttendancePath.EntryExitRegistration,
    component: EntryExit,
  },
  {
    path: AttendancePath.AttendanceCalenders,
    component: AttendanceCalender,
  },{
    path: AttendancePath.TrafficCalender,
    component: TrafficCalender,
  },
  {
    path: AttendancePath.Export,
    component: ExportPage,
  },
  {
    path: AttendancePath.ListOfApprovals,
    component: ListOfApprovals,
  },
  {
    path: AttendancePath.ShiftAllocation,
    component: ShiftAllocation,
  },{
    path: AttendancePath.FaceAllocation,
    component: FaceAllocation,
  },{
    path: AttendancePath.IpAllocation,
    component: IpAllocation,
  },{
    path: AttendancePath.LocationAllocation,
    component: LocationAllocation,
  },
];
