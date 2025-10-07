import { renderApp } from '@core/app';
import { createStoreWithReducers } from '@core/redux';
import '../../../configs/index.css';
import '@core/translate';
import { serviceRegistry } from '@core/helpers';
import "./index.css"

import AttendancePlugin from '@module/attendance/app';

async function bootstrap() {
  serviceRegistry.registerPlugin(AttendancePlugin);
  const { store, persistor } = createStoreWithReducers();

  renderApp('AttendanceRoot', { store, persistor });
}

bootstrap();
