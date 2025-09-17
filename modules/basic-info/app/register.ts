import { type PluginModule } from '../../../core';

import { BasicInfoRoutes } from './routes';
import { reducers } from './reducers';
import { BasicInfoMenu } from './menu';
import { BasicInfoSubHeaders } from './subHeader';
import { BasicInfoContents } from './contents';

const BasicInfoPlugin: PluginModule = {
  name: 'basic-info',
  reducers: reducers,
  apis: [],
  routes: BasicInfoRoutes.routes,
  contents: BasicInfoContents,
  subHeaders: BasicInfoSubHeaders,
  menu: BasicInfoMenu(),
};

export default BasicInfoPlugin;
