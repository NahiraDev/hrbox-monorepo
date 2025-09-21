import { createPaths } from '../../../core';
export const AttendencePath = createPaths('/attendence', {
  Dashboard: '/dashboard',
  EntryExitRegistration: '/entry-exit',
  AttendenceCalender: '/attendence-calender',
  TrafficCalender: '/traffic-calender',
  ListOfApprovals: '/list-of-approvals',
  Export: 'export',
  ShiftAllocation: '/shift-allocation',
});
