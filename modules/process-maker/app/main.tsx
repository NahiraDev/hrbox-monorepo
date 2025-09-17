import { createStoreWithReducers, renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';
import ProcessMakerPlugin from './register';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';



async function bootstrap() {
  serviceRegistry.registerPlugin(ProcessMakerPlugin);
  const { store, persistor } = createStoreWithReducers();
  renderApp('ProcessMakerRoot', { store, persistor } );
}

bootstrap();
