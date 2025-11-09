import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '@hrbox/routes/__root';

export const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/403',
  component: () => (
    <div className="flex h-screen items-center justify-center bg-panel-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-danger">403</h1>
        <p className="mt-4 text-xl text-secondary-600">دسترسی رد شد</p>
        <p className="mt-2 text-sm text-secondary-500">
          شما دسترسی به این صفحه ندارید
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-6 py-2 bg-panel-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  ),
});
