import { renderApp } from '@core/app';
import { createStoreWithReducers } from '@core/redux/store';
import { serviceRegistry } from '@core/helpers';

import HRLinkPlugin from '@module/hrlink/app/register';
import ProcessMakerPlugin from '@module/process-maker/app/register';
import ChartMakerPlugin from '@module/chart-maker/app/register';
import BasicInfoPlugin from '@module/basic-info/app/register';

const enabledModules = import.meta.env.VITE_ENABLED_MODULES?.split(',') || [];

async function bootstrap() {
  if (enabledModules.includes('sso')) {
    import('@module/sso/app/register').then(module => {
      serviceRegistry.registerPlugin(module.default);
    });
  }
  if (enabledModules.includes('hrlink')) serviceRegistry.registerPlugin(HRLinkPlugin);
  if (enabledModules.includes('process-maker')) serviceRegistry.registerPlugin(ProcessMakerPlugin);
  if (enabledModules.includes('basic-info')) serviceRegistry.registerPlugin(BasicInfoPlugin);
  if (enabledModules.includes('chart-maker')) serviceRegistry.registerPlugin(ChartMakerPlugin);

  await serviceRegistry.runPrefetch();

  const { store, persistor } = createStoreWithReducers(serviceRegistry.getAllReducers());

  renderApp('root', { store, persistor });
}

bootstrap().catch(console.error);
