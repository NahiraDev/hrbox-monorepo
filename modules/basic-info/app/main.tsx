import { renderApp } from 'core';
import '../../../configs/index.css';
import '../../../core/translate';
import './index.css';
import { serviceRegistry } from 'core';
import SSOPlugin from '@module/sso/app/register.ts';

async function bootstrap() {
  serviceRegistry.registerPlugin(SSOPlugin);
  renderApp('ssoRoot');
}

bootstrap();
