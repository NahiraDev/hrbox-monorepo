import { renderApp } from '@hrbox/core/app';
import { createStoreWithReducers } from '@hrbox/core/redux/store';
import { serviceRegistry } from '@hrbox/core/helpers';
import './index.css'
// Import all modules statically
import HRLinkPlugin from '@module/hrlink/app/register';
import ProcessMakerPlugin from '@module/process-maker/app/register';
import ChartMakerPlugin from '@module/chart-maker/app/register';
import BasicInfoPlugin from '@module/basic-info/app/register';

const enabledModules = import.meta.env.VITE_ENABLED_MODULES?.split(',') || [
  // 'hrlink',
  // 'process-maker',
  // 'chart-maker',
  'basic-info',
  // 'sso'
];

async function bootstrap() {
  try {
    console.log('🚀 Starting HR Box Application...');
    console.log('📦 Enabled modules:', enabledModules);

    // Register modules conditionally but on the same port
    const modulePromises: Promise<any>[] = [];

    if (enabledModules.includes('sso')) {
      modulePromises.push(
        import('@module/sso/app/register').then(module => {
          serviceRegistry.registerPlugin(module.default);
          console.log('✅ SSO module loaded');
        }).catch(err => {
          console.warn('⚠️ Failed to load SSO module:', err.message);
        })
      );
    }
    if (enabledModules.includes('hrlink') && location.pathname.includes("/hrlink")) {
      serviceRegistry.registerPlugin(HRLinkPlugin);
      console.log('✅ HRLink module registered');
    }

    if (enabledModules.includes('process-maker') && location.pathname.includes("/process-maker")) {
      serviceRegistry.registerPlugin(ProcessMakerPlugin);
      console.log('✅ ProcessMaker module registered');
    }

    if (enabledModules.includes('basic-info') && location.pathname.includes("/basic-info")) {
      serviceRegistry.registerPlugin(BasicInfoPlugin);
      console.log('✅ BasicInfo module registered');
    }

    if (enabledModules.includes('chart-maker') &&location.pathname.includes("/chart-maker")) {
      serviceRegistry.registerPlugin(ChartMakerPlugin);
      console.log('✅ ChartMaker module registered');
    }

    // Wait for all dynamic imports to complete
    await Promise.all(modulePromises);

    console.log('🔄 Running module prefetch...');
    // Run prefetch for all registered modules
    await serviceRegistry.runPrefetch();

    console.log('🏪 Creating Redux store...');
    // Create store with all reducers
    const { store, persistor } = createStoreWithReducers(serviceRegistry.getAllReducers());

    console.log('🎨 Rendering application...');
    // Render the main application
    renderApp('root', { store, persistor });

    console.log('✨ Application bootstrapped successfully!');
    console.log(`🌐 Application running on: http://localhost:5173`);

  } catch (error) {
    console.error('❌ Failed to bootstrap application:', error);

    // Show error in UI
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

// Start the application
bootstrap();
