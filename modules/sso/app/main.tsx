import { createStoreWithReducers, renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import './index.css';
import SSOPlugin from '../app/register';

import { serviceRegistry } from '../../../core';

async function bootstrap() {
  serviceRegistry.registerPlugin(SSOPlugin);
  const { store, persistor } = createStoreWithReducers();

  renderApp('ssoRoot', { store, persistor });
}

bootstrap();
