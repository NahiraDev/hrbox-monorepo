import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-secondary-600">صفحه یافت نشد</p>
        <p className="mt-2 text-sm text-secondary-500">
          صفحه‌ای که دنبال آن می‌گردید موجود نیست
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          بازگشت
        </button>
      </div>
    </div>
  ),
});
