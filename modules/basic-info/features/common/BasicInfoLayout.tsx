import type { Key, ReactNode } from 'react';
import { DynamicAddModal } from '@module/basic-info/features/employees/modals/DynamicAddModal';
import { AppButton, AppDeleteModal } from '@core/components';
import { Add, Category, FolderCross, Edit, Trash } from 'iconsax-react';
import { Listbox, ListboxItem } from '@heroui/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppTabs } from '@core/components';
import { useModalContext } from '@core/context';
import Report from '@module/basic-info/features/common/Repport';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { TickIcon } from '@root/shared/icons/TickIcon';

// ==================== INTERFACES ====================
interface TabItem {
  key: string;
  title: string;
  href?: string;
}

interface MoreItem {
  key: string;
  label: string;
  href?: string;
}

// ==================== CONSTANTS ====================
// تمام تب‌های اصلی (بدون تب More)
const ALL_MAIN_TABS: TabItem[] = [
  { key: 'personal-information', title: 'Personal Information', href: BasicInfoPaths.PersonalInformation },
  { key: 'documents', title: 'Documents', href: BasicInfoPaths.Documents },
  { key: 'jobs', title: 'Jobs', href: BasicInfoPaths.Jobs },
  { key: 'education', title: 'Educations', href: BasicInfoPaths.Educations },
  { key: 'skills', title: 'Skills', href: BasicInfoPaths.Skills },
  { key: 'courses', title: 'Courses', href: BasicInfoPaths.Courses },
  { key: 'achievements', title: 'Achievements', href: BasicInfoPaths.Achievements },
  { key: 'dependents', title: 'Dependents', href: BasicInfoPaths.Dependents },
];

// آیتم‌های ثابت در لیست More
const STATIC_MORE_ITEMS: MoreItem[] = [
  { key: '1', label: 'Organization-Specific Information', href: '/basic-info/organization-specific-information' },
  { key: '2', label: 'Onboarding', href: '/basic-info/onboarding' },
  { key: '3', label: 'Offboarding', href: '/basic-info/offboarding' },
  { key: '4', label: 'Guidelines', href: '/basic-info/guidelines' },
  { key: '5', label: 'Test Report', href: '/basic-info/test-report' },
  { key: '6', label: 'Contract List', href: '/basic-info/contract-list' },
  { key: '7', label: 'Request List', href: '/basic-info/request-list' },
  { key: '8', label: 'Health Records', href: '/basic-info/health-records' },
];

const TABS_WITH_ADD_BUTTON = ['education', 'skills', 'courses', 'achievements', 'jobs'];
const TABS_WITHOUT_BUTTONS = ['documents', 'dependents'];

// تنظیمات برای محاسبه هوشمند
const TAB_CONFIG = {
  minVisibleTabs: 2, // حداقل تعداد تب‌های قابل نمایش
  moreTabWidth: 100, // عرض تقریبی تب More
  tabPadding: 24, // padding هر تب (12px * 2)
  extraSpace: 20, // فضای اضافی برای margin و ...
};

// ==================== COMPONENTS ====================
const ListMore = ({ items, onSelect }: { items: MoreItem[]; onSelect: (key: Key) => void }) => (
  <Listbox
    aria-label="More Actions"
    items={items}
    onAction={onSelect}
    className="absolute bg-white shadow-lg rounded-lg z-50 p-2 mt-2 min-w-[240px] max-h-[400px] overflow-y-auto"
  >
    {(item: MoreItem) => (
      <ListboxItem key={item.key} className="hover:bg-primary-100 rounded-md py-2">
        {item.label}
      </ListboxItem>
    )}
  </Listbox>
);

const ProfileActions = ({ openModal }: { openModal: any }) => (
  <div className="flex gap-1">
    <AppButton
      props={{
        size: 'xs',
        color: 'white',
        variant: 'solid',
        className: 'p-1.5 bg-white hover:!bg-primary transition-all duration-200 w-[32px] h-[32px] rounded-[4px]',
        content: <Edit className="text-secondary-1000 group-hover:text-white" size={20} />,
      }}
    />
    <AppButton
      props={{
        size: 'xs',
        variant: 'light',
        isIconOnly: true,
        onPress: () =>
          openModal(
            'delete',
            '',
            <AppDeleteModal />,
            undefined,
            'lg',
            'Do you want to remove it?',
            <Trash className="text-white" />
          ),
        content: <Trash className="text-secondary-1000 group-hover:text-white" size={20} />,
        className: 'p-1.5 bg-white hover:!bg-red-500 transition-all duration-200 w-[32px] h-[32px] rounded-[4px]',
      }}
    />
  </div>
);

const AddButton = ({ tab, openModal }: { tab: string; openModal: any }) => {
  const getModalTitle = () => {
    const titleMap: Record<string, string> = {
      jobs: 'Job',
      education: 'Education',
      skills: 'Skill',
      courses: 'Course',
      achievements: 'Achievement',
    };
    return `Add New ${titleMap[tab as keyof typeof titleMap] || 'Item'}`;
  };

  return (
    <AppButton
      props={{
        className: 'bg-white',
        size: 'md',
        radius: 'sm',
        onPress: () =>
          openModal(
            'edit',
            '',
            <DynamicAddModal tab={tab} onClose={() => {}} />,
            undefined,
            '3xl',
            getModalTitle(),
            <Category className="text-white" />
          ),
        content: (
          <>
            <Add size={22} />
            <span>Add New One</span>
          </>
        ),
      }}
    />
  );
};

const EndWorkButton = () => (
  <AppButton
    props={{
      size: 'lg',
      radius: 'md',
      color: 'danger',
      content: (
        <>
          <FolderCross size={22} />
          <span>End of Work Relationship</span>
        </>
      ),
    }}
  />
);

// ==================== CUSTOM HOOK ====================
/**
 * هوک هوشمند برای مدیریت تب‌های Responsive
 * این هوک به صورت دینامیک محاسبه می‌کند که چند تب باید نمایش داده شود
 */
const useSmartResponsiveTabs = () => {
  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>(ALL_MAIN_TABS);
  const [hiddenTabs, setHiddenTabs] = useState<TabItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabWidthsRef = useRef<Map<string, number>>(new Map());
  const measurementDivRef = useRef<HTMLDivElement | null>(null);

  // تابع برای اندازه‌گیری عرض واقعی متن هر تب
  const measureTabWidth = useCallback((title: string): number => {
    // اگر قبلاً اندازه‌گیری شده، از cache استفاده کن
    if (tabWidthsRef.current.has(title)) {
      return tabWidthsRef.current.get(title)!;
    }

    // ایجاد یک div موقت برای اندازه‌گیری
    if (!measurementDivRef.current) {
      measurementDivRef.current = document.createElement('div');
      measurementDivRef.current.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        font-size: 16px;
        font-weight: 700;
        padding: 12px;
      `;
      document.body.appendChild(measurementDivRef.current);
    }

    measurementDivRef.current.textContent = title;
    const width = measurementDivRef.current.offsetWidth + TAB_CONFIG.extraSpace;

    // ذخیره در cache
    tabWidthsRef.current.set(title, width);

    return width;
  }, []);

  // تابع اصلی برای محاسبه تب‌های قابل نمایش
  const calculateVisibleTabs = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    // محاسبه عرض کل تمام تب‌ها
    const tabWidths = ALL_MAIN_TABS.map(tab => ({
      tab,
      width: measureTabWidth(tab.title),
    }));

    // محاسبه کل عرض تمام تب‌ها
    const totalTabsWidth = tabWidths.reduce((sum, item) => sum + item.width, 0);

    // اگر همه تب‌ها جا می‌شوند، همه را نمایش بده
    if (totalTabsWidth <= containerWidth) {
      setVisibleTabs(ALL_MAIN_TABS);
      setHiddenTabs([]);
      return;
    }

    // محاسبه تعداد تب‌هایی که می‌توانند نمایش داده شوند
    let totalWidth = 0;
    let visibleCount = 0;
    const availableWidthWithMore = containerWidth - TAB_CONFIG.moreTabWidth;

    for (let i = 0; i < tabWidths.length; i++) {
      const potentialWidth = totalWidth + tabWidths[i].width;

      if (potentialWidth <= availableWidthWithMore) {
        totalWidth = potentialWidth;
        visibleCount++;
      } else {
        break;
      }
    }

    // حداقل تعداد تب را رعایت کن
    visibleCount = Math.max(TAB_CONFIG.minVisibleTabs, visibleCount);

    // اگر تنها یک تب باقی مانده، آن را هم نمایش بده
    if (visibleCount === ALL_MAIN_TABS.length - 1) {
      visibleCount = ALL_MAIN_TABS.length;
    }

    // به‌روزرسانی state
    if (visibleCount >= ALL_MAIN_TABS.length) {
      setVisibleTabs(ALL_MAIN_TABS);
      setHiddenTabs([]);
    } else {
      setVisibleTabs(ALL_MAIN_TABS.slice(0, visibleCount));
      setHiddenTabs(ALL_MAIN_TABS.slice(visibleCount));
    }
  }, [measureTabWidth]);

  // Debounce برای بهینه‌سازی performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateVisibleTabs, 100);
    };

    // محاسبه اولیه
    calculateVisibleTabs();

    // استفاده از ResizeObserver برای تشخیص تغییرات اندازه
    const resizeObserver = new ResizeObserver(debouncedCalculate);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // پاک‌سازی
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();

      // پاک کردن div اندازه‌گیری
      if (measurementDivRef.current && document.body.contains(measurementDivRef.current)) {
        document.body.removeChild(measurementDivRef.current);
        measurementDivRef.current = null;
      }
    };
  }, [calculateVisibleTabs]);

  return { visibleTabs, hiddenTabs, containerRef };
};

// ==================== MAIN COMPONENT ====================
export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
  const { openModal } = useModalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { visibleTabs, hiddenTabs, containerRef } = useSmartResponsiveTabs();

  const [selectedTab, setSelectedTab] = useState(() => {
    const currentTab = ALL_MAIN_TABS.find(tab => tab.href && pathname.includes(tab.href));
    return currentTab?.key || 'personal-information';
  });

  const [showMore, setShowMore] = useState(false);
  const moreTabRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // به‌روزرسانی تب انتخابی بر اساس مسیر
  useEffect(() => {
    const currentTab = ALL_MAIN_TABS.find(tab => tab.href && pathname.includes(tab.href));
    if (currentTab) setSelectedTab(currentTab.key);
  }, [pathname]);

  // منطق نمایش دکمه‌ها
  const showRedButton = selectedTab === 'personal-information';
  const showWhiteButton = TABS_WITH_ADD_BUTTON.includes(selectedTab);
  const hideButtons = TABS_WITHOUT_BUTTONS.includes(selectedTab);

  const allMoreItems: MoreItem[] = [
    ...hiddenTabs.map(tab => ({
      key: tab.key,
      label: tab.title,
      href: tab.href,
    })),
    ...STATIC_MORE_ITEMS,
  ];

  const shouldShowMoreTab = hiddenTabs.length > 0 || STATIC_MORE_ITEMS.length > 0;

  const displayTabs: TabItem[] = shouldShowMoreTab
    ? [...visibleTabs, { key: 'more', title: 'More' }]
    : visibleTabs;
  const listMoreStyle: React.CSSProperties = {};
  if (moreTabRef.current && showMore) {
    const rect = moreTabRef.current.getBoundingClientRect();
    Object.assign(listMoreStyle, {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX}px`,
      zIndex: 50,
    });
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMore &&
        moreTabRef.current &&
        !moreTabRef.current.contains(event.target as Node)
      ) {
        const moreList = document.querySelector('.more-list-container');
        if (moreList && !moreList.contains(event.target as Node)) {
          setShowMore(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMore]);

  return (
    <div>
      <div className="bg-primary-400 w-full rounded-t-xl px-[26px] pt-4">
        <div className="flex items-center justify-between gap-7">
          <div
            className="w-[148px] h-[148px] rounded-lg relative mb-4"
            style={{
              backgroundImage: `url('https://i.pravatar.cc/150?u=a04258a2462d826712d')`,
              backgroundSize: 'cover',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered && (
              <div className="absolute top-27.5 right-1.5">
                <ProfileActions openModal={openModal} />
              </div>
            )}
            <div className="w-full absolute flex items-center justify-end p-1">
              <TickIcon color="#0A9AD7" />
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-7">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="!text-[28px] !font-bold text-white">Parisa Babie</span>
                <span className="!text-xl text-white">Product Designer</span>
                <span className="!text-xl text-white">
                  Place of Service: <span className="!font-bold !text-xl">Headquarters Office</span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                {!hideButtons && (
                  <>
                    {showRedButton && <EndWorkButton />}
                    {showWhiteButton && <AddButton tab={selectedTab} openModal={openModal} />}
                  </>
                )}
              </div>
            </div>
            <div ref={containerRef} className="relative w-full">
              <AppTabs
                fullWidth
                classNames={{
                  base: '!p-0 w-full',
                  tabList: 'bg-transparent !p-0 rounded-none w-full flex justify-between',
                  cursor: '!rounded-b-none bg-[#F1F9FD]',
                  panel: 'p-0',
                  tab: '!p-3 h-[46px] !rounded-0 flex-1',
                  tabContent:
                    'group-data-[selected=true]:!text-primary text-white text-base !font-bold',
                }}
                color="default"
                radius="sm"
                selectedKey={selectedTab}
                size="xl"
                tabs={displayTabs}
                variant="solid"
                onSelectionChange={(key: string) => {
                  if (key === 'more') {
                    setShowMore(prev => !prev);
                  } else {
                    setSelectedTab(key);
                    setShowMore(false);
                    const selectedTabItem = ALL_MAIN_TABS.find(tab => tab.key === key);
                    if (selectedTabItem?.href) {
                      navigate(selectedTabItem.href);
                    }
                  }
                }}
                ref={el => {
                  if (el) {
                    const moreTab = el.querySelector('[data-key="more"]') as HTMLDivElement;
                    if (moreTab) moreTabRef.current = moreTab;
                  }
                }}
              />
              {showMore && shouldShowMoreTab && (
                <div style={listMoreStyle} className="more-list-container">
                  <ListMore
                    items={allMoreItems}
                    onSelect={key => {
                      const item = allMoreItems.find(item => item.key === key);
                      if (item?.href) {
                        navigate(item.href);
                        const hiddenTab = hiddenTabs.find(tab => tab.key === key);
                        if (hiddenTab) {
                          setSelectedTab(String(key));
                        }
                      }
                      setShowMore(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="overflow-y-auto">
            <Report />
          </div>
        </div>
        <div className="col-span-10">{content}</div>
      </div>
    </div>
  );
};
