import type { PluginModule } from '../../../core';

import { AttendenceReducer } from './reducer';
import { AttendenceRoutes } from './routes';
import { AttendenceContents } from './contents';
import { AttendenceSubHeaders } from './subHeaders';
import { AttendenceMenu } from './menu';

const AttendencePlugin: PluginModule = {
  name: 'attendence',
  reducers: AttendenceReducer,
  apis: [],
  routes: AttendenceRoutes.routes,
  contents: AttendenceContents,
  subHeaders: AttendenceSubHeaders,
  menu: AttendenceMenu(),
};

export default AttendencePlugin;
