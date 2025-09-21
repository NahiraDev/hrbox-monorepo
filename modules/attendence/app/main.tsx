import { createStoreWithReducers, renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';

import AttendencePlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(AttendencePlugin);
  const { store, persistor } = createStoreWithReducers();

  renderApp('AttendenceRoot', { store, persistor });
}

bootstrap();
