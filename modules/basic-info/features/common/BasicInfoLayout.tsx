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
const ALL_MAIN_TABS: TabItem[] = [
  { key: 'personal-information', title: 'Personal Information', href: BasicInfoPaths.PersonalInformation },
  { key: 'documents', title: 'Documents', href: BasicInfoPaths.Documents },
  { key: 'jobs', title: 'Jobs', href: BasicInfoPaths.Jobs },
  { key: 'education', title: 'Educations', href: BasicInfoPaths.Educations },
  { key: 'skills', title: 'Skills', href: BasicInfoPaths.Skills },
  { key: 'courses', title: 'Courses', href: BasicInfoPaths.Courses },
  { key: 'achievements', title: 'Achievements', href: BasicInfoPaths.Achievements },
  { key: 'dependents', title: 'Dependents', href: BasicInfoPaths.Dependents },
  { key: 'organization-specific-information', title: 'Organization-Specific Information', href: '/basic-info/organization-specific-information' },
  { key: 'onboarding', title: 'Onboarding', href: '/basic-info/onboarding' },
  { key: 'offboarding', title: 'Offboarding', href: '/basic-info/offboarding' },
  { key: 'guidelines', title: 'Guidelines', href: '/basic-info/guidelines' },
  { key: 'test-report', title: 'Test Report', href: '/basic-info/test-report' },
  { key: 'contract-list', title: 'Contract List', href: '/basic-info/contract-list' },
  { key: 'request-list', title: 'Request List', href: '/basic-info/request-list' },
  { key: 'health-records', title: 'Health Records', href: '/basic-info/health-records' },
];

const TABS_WITH_ADD_BUTTON = ['education', 'skills', 'courses', 'achievements', 'jobs'];
const TABS_WITHOUT_BUTTONS = ['documents', 'dependents'];

const TAB_CONFIG = {
  minVisibleTabs: 2,
  moreTabWidth: 100,
  tabPadding: 24,
  extraSpace: 20,
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
const useSmartResponsiveTabs = () => {
  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>(ALL_MAIN_TABS);
  const [hiddenTabs, setHiddenTabs] = useState<TabItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tabWidthsRef = useRef<Map<string, number>>(new Map());
  const measurementDivRef = useRef<HTMLDivElement | null>(null);

  const measureTabWidth = useCallback((title: string): number => {
    if (tabWidthsRef.current.has(title)) {
      return tabWidthsRef.current.get(title)!;
    }

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

    tabWidthsRef.current.set(title, width);

    return width;
  }, []);

  const calculateVisibleTabs = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    const tabWidths = ALL_MAIN_TABS.map(tab => ({
      tab,
      width: measureTabWidth(tab.title),
    }));

    const totalTabsWidth = tabWidths.reduce((sum, item) => sum + item.width, 0);

    if (totalTabsWidth <= containerWidth) {
      setVisibleTabs(ALL_MAIN_TABS);
      setHiddenTabs([]);
      return;
    }

    const availableWidth = containerWidth - TAB_CONFIG.moreTabWidth;

    let accumulatedWidth = 0;
    let visibleCount = 0;

    for (let i = 0; i < tabWidths.length; i++) {
      const nextWidth = accumulatedWidth + tabWidths[i].width;

      if (nextWidth <= availableWidth) {
        accumulatedWidth = nextWidth;
        visibleCount++;
      } else {
        break;
      }
    }

    visibleCount = Math.max(TAB_CONFIG.minVisibleTabs, visibleCount);

    if (visibleCount === ALL_MAIN_TABS.length - 1) {
      visibleCount = ALL_MAIN_TABS.length;
    }

    const newVisibleTabs = ALL_MAIN_TABS.slice(0, visibleCount);
    const newHiddenTabs = ALL_MAIN_TABS.slice(visibleCount);

    setVisibleTabs(prev => {
      const prevKeys = prev.map(t => t.key).join(',');
      const newKeys = newVisibleTabs.map(t => t.key).join(',');
      return prevKeys !== newKeys ? newVisibleTabs : prev;
    });

    setHiddenTabs(prev => {
      const prevKeys = prev.map(t => t.key).join(',');
      const newKeys = newHiddenTabs.map(t => t.key).join(',');
      return prevKeys !== newKeys ? newHiddenTabs : prev;
    });
  }, [measureTabWidth]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedCalculate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculateVisibleTabs, 100);
    };

    calculateVisibleTabs();

    const resizeObserver = new ResizeObserver(debouncedCalculate);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();

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

  useEffect(() => {
    const currentTab = ALL_MAIN_TABS.find(tab => tab.href && pathname.includes(tab.href));
    if (currentTab) setSelectedTab(currentTab.key);
  }, [pathname]);

  const showRedButton = selectedTab === 'personal-information';
  const showWhiteButton = TABS_WITH_ADD_BUTTON.includes(selectedTab);
  const hideButtons = TABS_WITHOUT_BUTTONS.includes(selectedTab);

  // آیتم‌های لیست More (فقط تب‌های مخفی شده)
  const allMoreItems: MoreItem[] = hiddenTabs.map(tab => ({
    key: tab.key,
    label: tab.title,
    href: tab.href,
  }));

  // تب More را فقط زمانی نمایش بده که تب‌های مخفی وجود داشته باشند
  const shouldShowMoreTab = hiddenTabs.length > 0;

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
      <div className="bg-primary-400 w-full rounded-t-xl pl-[26px] pt-4">
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
                  tabList: 'bg-transparent !p-0 rounded-none w-full flex items-center justify-between',
                  cursor: '!rounded-b-none bg-[#F1F9FD]',
                  panel: 'p-0',
                  tab: 'p-3 h-[46px] !rounded-0 flex-1 ',
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
