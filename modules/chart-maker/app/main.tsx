import { renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';
import ChartMakerPlugin from './register';

async function bootstrap() {
  serviceRegistry.registerPlugin(ChartMakerPlugin);
  renderApp('ChartMakerRoot');
}

bootstrap();
