import { renderApp } from '@core/app';
import '@configs/index.css';
import '@core/translate';
import { serviceRegistry } from '@core/helpers';
import { createStoreWithReducers } from '@core/redux/store';

import HRLinkPlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(HRLinkPlugin);
  const { store, persistor } = createStoreWithReducers();

  renderApp('HRLinkRoot', { store, persistor });
}
bootstrap().catch((error) => {
  console.error('Error during app bootstrap:', error);
});
