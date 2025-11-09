// ============================================
// main.tsx
// ============================================

import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';
import { HeroUIProvider } from '@heroui/react';

import { moduleRegistry } from '@hrbox/modules/registry';
import { createStoreWithModules } from '@hrbox/core/redux/store';
import { router } from '@hrbox/core/routes/router';
import i18n from '@hrbox/core/translate';
import { LoadingProvider } from '@hrbox/core/providers/LoadingContext';
import { ModalProvider } from '@hrbox/core/providers/ModalProvider';
import { useInitApp } from '@hrbox/core/hooks';

import '@hrbox/core/config/theme/index.css';

// ============================================
// QueryClient Setup
// ============================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// ============================================
// Enabled Modules (از ENV variables)
// ============================================

const ENABLED_MODULES = (import.meta.env.VITE_ENABLED_MODULES || '').split(',').filter(Boolean) || [
  'sso',
  'hrlink',
  'hrbox',
  'process-maker',
  'chart-maker',
  'basic-info',
  'attendance',
];

// ============================================
// App Bootstrap Component
// ============================================

function AppBootstrap() {
  useInitApp();
  return null;
}

// ============================================
// Main Bootstrap Function
// ============================================

async function bootstrap() {
  try {
    console.log('🚀 Starting application bootstrap...');

    // ============================================
    // 1️⃣ ثبت ماژول‌ها
    // ============================================

    if (ENABLED_MODULES.includes('sso')) {
      try {
        const { default: SSOPlugin } = await import('@hrbox/modules/sso/plugin');
        moduleRegistry.register(SSOPlugin);
        console.log('✅ SSO Module registered');
      } catch (e) {
        console.error('❌ Failed to load SSO module', e);
      }
    }

    if (ENABLED_MODULES.includes('hrlink')) {
      try {
        const { default: HRLinkPlugin } = await import('@module/hrlink/plugin');
        moduleRegistry.register(HRLinkPlugin);
        console.log('✅ HRLink Module registered');
      } catch (e) {
        console.error('❌ Failed to load HRLink module', e);
      }
    }

    if (ENABLED_MODULES.includes('hrbox')) {
      try {
        const { default: HRBoxPlugin } = await import('@hrbox/modules/hrbox/plugin');
        moduleRegistry.register(HRBoxPlugin);
        console.log('✅ HRBox Module registered');
      } catch (e) {
        console.error('❌ Failed to load HRBox module', e);
      }
    }

    if (ENABLED_MODULES.includes('process-maker')) {
      try {
        const { default: ProcessMakerPlugin } = await import('@hrbox/modules/process-maker/plugin');
        moduleRegistry.register(ProcessMakerPlugin);
        console.log('✅ Process Maker Module registered');
      } catch (e) {
        console.error('❌ Failed to load Process Maker module', e);
      }
    }

    if (ENABLED_MODULES.includes('chart-maker')) {
      try {
        const { default: ChartMakerPlugin } = await import('@hrbox/modules/chart-maker/plugin');
        moduleRegistry.register(ChartMakerPlugin);
        console.log('✅ Chart Maker Module registered');
      } catch (e) {
        console.error('❌ Failed to load Chart Maker module', e);
      }
    }

    if (ENABLED_MODULES.includes('basic-info')) {
      try {
        const { default: BasicInfoPlugin } = await import('@hrbox/modules/basic-info/plugin');
        moduleRegistry.register(BasicInfoPlugin);
        console.log('✅ Basic Info Module registered');
      } catch (e) {
        console.error('❌ Failed to load Basic Info module', e);
      }
    }

    if (ENABLED_MODULES.includes('attendance')) {
      try {
        const { default: AttendancePlugin } = await import('@hrbox/modules/attendance/plugin');
        moduleRegistry.register(AttendancePlugin);
        console.log('✅ Attendance Module registered');
      } catch (e) {
        console.error('❌ Failed to load Attendance module', e);
      }
    }

    // ============================================
    // 2️⃣ Prefetch ماژول‌ها
    // ============================================

    console.log('⏳ Prefetching modules...');
    await moduleRegistry.runPrefetch();
    console.log('✅ Modules prefetched');

    // ============================================
    // 3️⃣ ایجاد Redux Store
    // ============================================

    console.log('⏳ Creating Redux store...');
    const { store, persistor } = createStoreWithModules(ENABLED_MODULES);
    console.log('✅ Redux store created');

    // ============================================
    // 4️⃣ رندر اپ
    // ============================================

    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <I18nextProvider i18n={i18n}>
                <HeroUIProvider>
                  <LoadingProvider>
                    <ModalProvider store={store}>
                      {/* ✅ بارگذاری اطلاعات اولیه */}
                      <AppBootstrap />

                      {/* ✅ روتر اصلی */}
                      <RouterProvider router={router} />

                      {/* ✅ Toaster برای اعلان‌ها */}
                      <Toaster
                        position="top-right"
                        richColors
                        closeButton
                        duration={3000}
                      />
                    </ModalProvider>
                  </LoadingProvider>
                </HeroUIProvider>
              </I18nextProvider>

              {/* ✅ React Query DevTools (فقط در development) */}
              {import.meta.env.DEV && <ReactQueryDevtools />}
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </StrictMode>
    );

    console.log('✅ Application bootstrapped successfully!');
  } catch (error) {
    console.error('❌ Failed to bootstrap application:', error);
    // نمایش خطا به کاربر
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #fee;
        font-family: system-ui;
      ">
        <div style="text-align: center;">
          <h1 style="color: #c00;">خطا در بارگذاری برنامه</h1>
          <p style="color: #666;">لطفاً صفحه را دوباره بارگذاری کنید</p>
          <pre style="
            background: #f5f5f5;
            padding: 1rem;
            border-radius: 4px;
            text-align: left;
            max-width: 600px;
            overflow: auto;
          ">${error}</pre>
        </div>
      </div>
    `;
  }
}

// ============================================
// شروع برنامه
// ============================================

bootstrap();