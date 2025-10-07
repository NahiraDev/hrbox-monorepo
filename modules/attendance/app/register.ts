import type { PluginModule } from '@core/helpers';

import { AttendanceReducer } from '@module/attendance/app/reducer';
import { AttendanceRoutes } from '@module/attendance/app/routes';
import { AttendanceContents } from '@module/attendance/app/contents';
import { AttendanceSubHeaders } from '@module/attendance/app/subHeaders';
import { AttendanceMenu } from '@module/attendance/app/menu';

const AttendancePlugin: PluginModule = {
  name: 'attendance',
  reducers: AttendanceReducer,
  apis: [],
  routes: AttendanceRoutes.routes,
  contents: AttendanceContents,
  subHeaders: AttendanceSubHeaders,
  menu: AttendanceMenu(),
};

export default AttendancePlugin;
