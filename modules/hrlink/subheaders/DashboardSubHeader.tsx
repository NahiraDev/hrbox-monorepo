interface DashboardSubHeaderProps {
  showStats?: boolean;
  showActions?: boolean;
}

export default function DashboardSubHeader({
                                             showStats = false,
                                             showActions = false,
                                           }: DashboardSubHeaderProps) {
  return (
    <div className="bg-panel-surface px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-bold text-secondary-1000 dark:text-white">
            داشبورد من
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            خوش آمدید! اینجا خلاصه‌ای از فعالیت‌های شماست
          </p>
        </div>

        {/* Right Side - Actions */}
        {showActions && (
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
              + جستجوی شغل
            </button>
            <button className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-secondary-900 dark:text-white rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all">
              📄 رزومه من
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      {showStats && (
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
            <p className="text-sm text-primary-700 dark:text-primary-300">درخواست‌های من</p>
            <p className="text-2xl font-bold text-primary-900 dark:text-primary-100 mt-1">12</p>
          </div>
          <div className="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
            <p className="text-sm text-success-700 dark:text-success-300">قبول شده</p>
            <p className="text-2xl font-bold text-success-900 dark:text-success-100 mt-1">3</p>
          </div>
          <div className="bg-warning-50 dark:bg-warning-900/20 rounded-lg p-4">
            <p className="text-sm text-warning-700 dark:text-warning-300">در انتظار</p>
            <p className="text-2xl font-bold text-warning-900 dark:text-warning-100 mt-1">7</p>
          </div>
          <div className="bg-danger-50 dark:bg-danger-900/20 rounded-lg p-4">
            <p className="text-sm text-danger-700 dark:text-danger-300">رد شده</p>
            <p className="text-2xl font-bold text-danger-900 dark:text-danger-100 mt-1">2</p>
          </div>
        </div>
      )}
    </div>
  );
}