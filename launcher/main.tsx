import { renderApp } from '@core/app';
import { createStoreWithReducers } from '@core/redux/store';
import { serviceRegistry } from '@core/helpers';

const moduleImports: Record<string, () => Promise<any>> = {
  hrlink: () => import('@module/hrlink/app/register'),
  'process-maker': () => import('@module/process-maker/app/register'),
  'chart-maker': () => import('@module/chart-maker/app/register'),
  'basic-info': () => import('@module/basic-info/app/register'),
  sso: () => import('@module/sso/app/register')
};

const enabledModules = import.meta.env.VITE_ENABLED_MODULES?.split(',') || [
  'hrlink',
  'process-maker',
  'chart-maker',
  'basic-info'
];

async function bootstrap() {
  try {
    console.log('🚀 Starting HR Box Application...');
    console.log('📦 Enabled modules:', enabledModules);

    const modulePromises: Promise<any>[] = [];

    enabledModules.forEach(module => {
      if (moduleImports[module]) {
        modulePromises.push(
          moduleImports[module]().then(m => {
            serviceRegistry.registerPlugin(m.default);
            console.log(`✅ ${module} module loaded`);
          }).catch(err => console.warn(`⚠️ Failed to load ${module}:`, err.message))
        );
      }
    });

    await Promise.all(modulePromises);
    await serviceRegistry.runPrefetch();

    const { store, persistor } = createStoreWithReducers(serviceRegistry.getAllReducers());
    renderApp('root', { store, persistor });

    console.log('✨ Application bootstrapped successfully!');
    console.log(`🌐 Application running on: http://localhost:5173`);
  } catch (error) {
    console.error('❌ Failed to bootstrap application:', error);
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          font-family: system-ui, -apple-system, sans-serif;
          color: #ef4444;
          background: #fef2f2;
          padding: 2rem;
          text-align: center;
        ">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">❌ Application Failed to Start</h1>
          <p style="font-size: 1.1rem; margin-bottom: 2rem; max-width: 600px;">
            There was an error loading the application. Please check the console for more details.
          </p>
          <details style="background: white; padding: 1rem; border-radius: 8px; border: 1px solid #fecaca;">
            <summary style="cursor: pointer; font-weight: bold;">Error Details</summary>
            <pre style="margin-top: 1rem; text-align: left; font-size: 0.9rem;">${error instanceof Error ? error.stack : String(error)}</pre>
          </details>
          <button onclick="window.location.reload()" style="
            margin-top: 2rem;
            padding: 0.75rem 1.5rem;
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
          ">
            🔄 Reload Page
          </button>
        </div>
      `;
    }
  }
}

bootstrap();
