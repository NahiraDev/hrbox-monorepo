import { useState } from 'react';
import { SearchNormal1, Filter } from 'iconsax-reactjs';

interface JobsSubHeaderProps {
  showFilters?: boolean;
  showSearch?: boolean;
}

export default function JobsSubHeader({
                                        showFilters = true,
                                        showSearch = true,
                                      }: JobsSubHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  return (
    <div className="bg-panel-surface px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-1000 dark:text-white">
            فرصت‌های شغلی
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            2,456 موقعیت شغلی فعال
          </p>
        </div>

        {showFilters && (
          <button
            onClick={() => setShowFilterPanel(!showFilterPanel)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-secondary-900 dark:text-white rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all"
          >
            <Filter size={20} />
            فیلترها
          </button>
        )}
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="relative">
          <SearchNormal1
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی موقعیت شغلی، شرکت یا مهارت..."
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-secondary-900 dark:text-white placeholder-neutral-400"
          />
        </div>
      )}

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <div className="grid grid-cols-4 gap-4">
            <select className="px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg">
              <option>نوع قرارداد</option>
              <option>تمام وقت</option>
              <option>پاره وقت</option>
              <option>پروژه‌ای</option>
            </select>
            <select className="px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg">
              <option>حقوق</option>
              <option>توافقی</option>
              <option>5-10 میلیون</option>
              <option>10-20 میلیون</option>
            </select>
            <select className="px-3 py-2 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg">
              <option>شهر</option>
              <option>تهران</option>
              <option>مشهد</option>
              <option>اصفهان</option>
            </select>
            <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all">
              اعمال فیلتر
            </button>
          </div>
        </div>
      )}
    </div>
  );
}