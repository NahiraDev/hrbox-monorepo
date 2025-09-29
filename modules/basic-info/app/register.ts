
import { BasicInfoRoutes } from '@module/basic-info/app/routes';
import { reducers } from '@module/basic-info/app/reducers';
import { BasicInfoMenu } from '@module/basic-info/app/menu';
import { BasicInfoSubHeaders } from '@module/basic-info/app/subHeader';
import { BasicInfoContents } from '@module/basic-info/app/contents';
import type { PluginModule } from '@core/helpers';

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
