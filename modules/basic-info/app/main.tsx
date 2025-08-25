import { renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';

import BasicInfoPlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(BasicInfoPlugin);
  renderApp('basicInfoRoot');
}

bootstrap();
