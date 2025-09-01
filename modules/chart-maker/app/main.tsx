import { renderApp } from '../../../core';
import '../../../configs/index.css';
import '../../../core/translate';
import { serviceRegistry } from '../../../core';
import ChartMakerPlugin from './register';
import './index.css';

async function bootstrap() {
  serviceRegistry.registerPlugin(ChartMakerPlugin);
  renderApp('ChartMakerRoot');
}

bootstrap();
