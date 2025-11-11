import type { PluginModule } from '@core/helpers';
import '@module/process-maker/app/index.css';
import { ProcessMakerReducers } from '@module/process-maker/app/reducer';
import { ProcessMakerRoutes } from '@module/process-maker/app/routes';
import { ProcessMakerContents } from '@module/process-maker/app/contents';
import { ProcessMakerSubHeaders } from '@module/process-maker/app/subHeaders';
import { ProcessMakerMenu } from '@module/process-maker/app/menu';

const ProcessMakerPlugin: PluginModule = {
  name: 'process-maker',
  reducers: ProcessMakerReducers,
  apis: [],
  routes: ProcessMakerRoutes.routes,
  contents: ProcessMakerContents,
  subHeaders: ProcessMakerSubHeaders,
  menu: ProcessMakerMenu()
};

export default ProcessMakerPlugin;
