import { createPaths } from '@core/routes';
export const AttendancePath = createPaths('/attendance', {
  Dashboard: '/dashboard',
  EntryExitRegistration: '/entry-exit',
  AttendanceCalenders: '/attendance-calender',
  TrafficCalender: '/traffic-calender',
  ListOfApprovals: '/list-of-approvals',
  Export: '/export',
  ShiftAllocation: '/shift-allocation',
  FaceAllocation: '/face-allocation',
  IpAllocation: '/ip-allocation',
  LocationAllocation: '/location-allocation',
});
