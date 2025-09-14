import { createStoreWithReducers, renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';
import ProcessMakerPlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(ProcessMakerPlugin);
  const { store, persistor } = createStoreWithReducers();
  renderApp('ProcessMakerRoot', { store, persistor } );
}

bootstrap();
