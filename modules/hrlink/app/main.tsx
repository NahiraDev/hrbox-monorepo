import { renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';
import HRLinkPlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(HRLinkPlugin);
  renderApp('hrlinkRoot');
}

bootstrap();
