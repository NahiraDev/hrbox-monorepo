import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";
import { HeroUIProvider } from "@heroui/react";
import { initRouter, RouterContextProvider } from "@hrbox/core/routes/router";
import { RouterProvider } from "@tanstack/react-router";
import { moduleRegistry } from "@hrbox/modules/registry";
import { createStoreWithModules } from "@hrbox/core/redux/store";
import i18n from "@hrbox/core/translate";
import { LoadingProvider } from "@hrbox/core/providers/LoadingContext";
import { ModalProvider } from "@hrbox/core/providers/ModalProvider";
import "@hrbox/core/config/theme/index.css";

import { GlobalModalRenderer } from "@hrbox/uikit/components/GlobalModalRenderer";

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
// Enabled Modules
// ============================================

const ENABLED_MODULES = (import.meta.env.VITE_ENABLED_MODULES || "")
  .split(",")
  .filter(Boolean) || [
  "sso",
  "hrlink",
  "payroll",
  "messenger",
  "process-maker",
  "chart-maker",
  "basic-info",
  "attendance",
  "job-gradings",
  "project-management",
];

// ============================================
// Bootstrap Function
// ============================================

async function bootstrap() {
  try {
    const moduleLoaders: Record<string, () => Promise<any>> = {
      sso: () => import("@hrbox/modules/sso/plugin"),
      hrlink: () => import("@hrbox/modules/hrlink/plugin"),
      "process-maker": () => import("@hrbox/modules/process-maker/plugin"),
      "chart-maker": () => import("@hrbox/modules/chart-maker/plugin"),
      "basic-info": () => import("@hrbox/modules/basic-info/plugin"),
      attendance: () => import("@hrbox/modules/attendance/plugin"),
      "job-gradings": () => import("@hrbox/modules/jobgradings/plugin"),
      "project-management": () =>
        import("@hrbox/modules/project-management/plugin"),
    };

    await Promise.all(
      ENABLED_MODULES.map(async (moduleName: any) => {
        if (moduleLoaders[moduleName]) {
          const { default: ModulePlugin } = await moduleLoaders[moduleName]();
          moduleRegistry.register(ModulePlugin);
        }
      }),
    );

    await moduleRegistry.runPrefetch();

    const { store, persistor } = createStoreWithModules(ENABLED_MODULES);

    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found");
    }

    const router = initRouter();

    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <I18nextProvider i18n={i18n}>
                <HeroUIProvider>
                  <LoadingProvider>
                    <ModalProvider>
                      <RouterContextProvider>
                        <RouterProvider router={router} />
                      </RouterContextProvider>

                      <GlobalModalRenderer />

                      <Toaster
                        position="top-right"
                        richColors
                        closeButton
                        duration={3000}
                        theme="system"
                      />
                    </ModalProvider>
                  </LoadingProvider>
                </HeroUIProvider>
              </I18nextProvider>
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </StrictMode>,
    );
  } catch (error) {
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        font-family: system-ui, -apple-system, sans-serif;
        color: white;
      ">
        <div style="
          text-align: center;
          max-width: 600px;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        ">
          <h1 style="font-size: 3rem; margin: 0 0 1rem;">😢</h1>
          <h2 style="margin: 0 0 1rem; font-weight: 600;">خطا در بارگذاری برنامه</h2>
          <p style="opacity: 0.9; margin-bottom: 2rem;">
            متأسفانه مشکلی در بارگذاری اپلیکیشن پیش آمده است
          </p>
          <button
            onclick="window.location.reload()"
            style="
              background: white;
              color: #667eea;
              border: none;
              padding: 12px 32px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              font-size: 1rem;
              transition: transform 0.2s;
            "
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
          >
            🔄 تلاش مجدد
          </button>
          ${
            import.meta.env.DEV
              ? `
            <details style="
              margin-top: 2rem;
              text-align: left;
              background: rgba(0, 0, 0, 0.2);
              padding: 1rem;
              border-radius: 8px;
              font-size: 0.875rem;
            ">
              <summary style="cursor: pointer; font-weight: 600; margin-bottom: 0.5rem;">
                جزئیات خطا (فقط در Development)
              </summary>
              <pre style="
                overflow: auto;
                white-space: pre-wrap;
                word-break: break-word;
                font-family: monospace;
                font-size: 0.75rem;
              ">${error}</pre>
            </details>
          `
              : ""
          }
        </div>
      </div>
    `;
  }
}

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="text-center text-white">
        <div className="inline-block animate-spin h-16 w-16 border-4 border-white border-t-transparent rounded-full mb-6" />
        <h2 className="text-2xl font-bold mb-2">HRBox</h2>
        <p className="text-sm opacity-90">در حال بارگذاری...</p>
      </div>
    </div>
  );
}

bootstrap();

if (import.meta.hot) {
  import.meta.hot.accept();

  import.meta.hot.dispose(() => {
    moduleRegistry.clear();
  });
}
