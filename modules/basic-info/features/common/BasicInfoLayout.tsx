import type { Key, ReactNode } from 'react';
import { AppButton, AppDeleteModal } from '@core/components';
import { Add, Category, FolderCross, MessageEdit, Trash } from 'iconsax-react';
import { Listbox, ListboxItem } from '@heroui/react';
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppTabs } from '@core/components';
import { useModalContext } from '@core/context';
import Report from '@module/basic-info/features/common/Repport';
import AddNewCourses from '@module/basic-info/features/employees/modals/AddNewCourses';
import { BasicInfoPaths } from '@module/basic-info/app/paths';
import { workerInfo } from '@module/basic-info/app/mock';
import PropTypes from 'prop-types';

// تعریف نوع برای EmployeesTab
interface TabItem {
  key: string;
  title: string;
  href?: string;
}

const EmployeesTab: TabItem[] = [
  { key: 'personal-information', title: 'Personal Information', href: BasicInfoPaths.PersonalInformation },
  { key: 'documents', title: 'Documents', href: BasicInfoPaths.Documents },
  { key: 'jobs', title: 'Jobs', href: BasicInfoPaths.Jobs },
  { key: 'education', title: 'Educations', href: BasicInfoPaths.Educations },
  { key: 'skills', title: 'Skills', href: BasicInfoPaths.Skills },
  { key: 'courses', title: 'Courses', href: BasicInfoPaths.Courses },
  { key: 'achievements', title: 'Achievements', href: BasicInfoPaths.Achievements },
  { key: 'dependents', title: 'Dependents', href: BasicInfoPaths.Dependents },
  { key: 'more', title: 'More' },
];

// تعریف نوع برای moreItems
interface MoreItem {
  key: string;
  label: string;
  href?: string;
}

const moreItems: MoreItem[] = [
  { key: '1', label: 'Organization-Specific Information', href: '/basic-info/organization-specific-information' },
  { key: '2', label: 'Onboarding', href: '/basic-info/onboarding' },
  { key: '3', label: 'Offboarding', href: '/basic-info/offboarding'},
  { key: '4', label: 'Guidelines' , href: '/basic-info/guidelines'},
  { key: '5', label: 'Test Report' , href: '/basic-info/test-report'},
  { key: '6', label: 'Contract List' , href: '/basic-info/contract-list'},
  { key: '7', label: 'Request List', href: '/basic-info/request-list '},
  { key: '8', label: 'Health Records', href: '/basic-info/health-records' },
];

// تعریف نوع موقت برای AppTabsProps
interface AppTabsProps {
  fullWidth?: boolean;
  classNames?: {
    base?: string;
    tabList?: string;
    cursor?: string;
    panel?: string;
    tab?: string;
    tabContent?: string;
  };
  color?: string;
  radius?: string;
  selectedKey?: string;
  size?: string;
  tabs: TabItem[];
  variant?: string;
  onSelectionChange?: (key: string) => void;
}

// کامپوننت ListMore
const ListMore = ({ onSelect }: { onSelect: (key: Key) => void }) => {
  return (
    <Listbox aria-label="More Actions" items={moreItems} onAction={onSelect} className="absolute left-192 top-13 bg-white shadow-sm rounded-lg z-10">
      {(item: MoreItem) => (
        <ListboxItem key={item.key} className="hover:bg-primary-50">
          {item.label}
        </ListboxItem>
      )}
    </Listbox>
  );
};

// کامپوننت BasicInfoLayout
export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
  const { openModal } = useModalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>(() => {
    const currentTab = EmployeesTab.find((tab) => tab.href && pathname.includes(tab.href));
    return currentTab ? currentTab.key : 'personal-information';
  });
  const [showMore, setShowMore] = useState(false);
  const moreTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTab = EmployeesTab.find((tab) => tab.href && pathname.includes(tab.href));
    if (currentTab) {
      setSelectedTab(currentTab.key);
    }
  }, [pathname]);

  // منطق نمایش دکمه‌ها
  const showRedButton = selectedTab === 'personal-information'; // دکمه قرمز برای PersonalInformation
  const showWhiteButton = ['education', 'skills', 'courses', 'achievements', 'jobs'].includes(selectedTab); // دکمه سفید برای تب‌های مشخص
  const hideButtons = ['documents', 'dependents'].includes(selectedTab); // عدم نمایش دکمه‌ها برای Documents و Dependents

  // محاسبه موقعیت ListMore
  const offsetX = 10; // افست به سمت راست (قابل تنظیم)
  const listMoreStyle: React.CSSProperties = {};
  if (moreTabRef.current && showMore) {
    const rect = moreTabRef.current.getBoundingClientRect();
    listMoreStyle.position = 'absolute';
    listMoreStyle.top = `${rect.bottom + window.scrollY}px`; // زیر دکمه More
    listMoreStyle.left = `${rect.left + window.scrollX + offsetX}px`; // جابه‌جایی به سمت راست با افست
    listMoreStyle.zIndex = 50;
  }

  return (
    <div>
      <div className="bg-primary-400 w-full rounded-t-xl px-4 pt-4">
        <div className="flex items-center justify-between gap-7">
          <div
            className="w-36 h-36 rounded-lg"
            style={{ background: `url('https://i.pravatar.cc/150?u=a04258a2462d826712d')` }}
          >
            <div className="flex flex-col justify-between items-end h-full p-1">
              <div className="flex gap-1">
                <AppButton
                  props={{
                    size: 'xs',
                    radius: 'sm',
                    color: 'white',
                    variant: 'solid',
                    className: 'p-1 bg-white hover:!bg-primary transition-all duration-200 w-7 h-7',
                    content: <MessageEdit className="text-secondary-1000 group-hover:text-white" size={20} />,
                  }}
                />
                <AppButton
                  props={{
                    size: 'xs',
                    radius: 'sm',
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
                    className: 'p-1 bg-white hover:!bg-red-500 transition-all duration-200 w-7 h-7',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between w-full gap-7">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-[28px] font-bold text-white">Parisa Babie</span>
                <span className="text-xl text-white">Product Designer</span>
                <span className="text-xl text-white">
                  Place of Service: <span className="font-bold">Headquarters Office</span>
                </span>
              </div>
              <div className="flex items-start gap-2">
                {!hideButtons && (
                  <>
                    {showRedButton && (
                      <AppButton
                        props={{
                          size: 'md',
                          radius: 'lg',
                          color: 'danger',
                          content: (
                            <>
                              <FolderCross size={22} />
                              <span>End of Work Relationship</span>
                            </>
                          ),
                        }}
                      />
                    )}
                    {showWhiteButton && (
                      <AppButton
                        props={{
                          className: 'bg-white',
                          size: 'md',
                          radius: 'sm',
                          onPress: () =>
                            openModal(
                              'edit',
                              '',
                              <AddNewCourses />,
                              undefined,
                              'xl',
                              'Software Management',
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
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <AppTabs
                fullWidth
                classNames={{
                  base: '!p-0',
                  tabList: '0 bg-transparent !p-0 rounded-none',
                  cursor: '!rounded-b-none bg-[#F1F9FD]',
                  panel: 'p-0',
                  tab: '!p-3 h-[46px] !rounded-0',
                  tabContent: 'group-data-[selected=true]:!text-primary text-white text-base font-semibold',
                }}
                color="default"
                radius="sm"
                selectedKey={selectedTab}
                size="xl"
                tabs={EmployeesTab}
                variant="solid"
                onSelectionChange={(key: string) => {
                  if (key === 'more') {
                    setShowMore((prev) => !prev);
                  } else {
                    setSelectedTab(key);
                    setShowMore(false);
                  }
                }}
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    const moreTab = el.querySelector('[data-key="more"]') as HTMLDivElement;
                    if (moreTab) moreTabRef.current = moreTab;
                  }
                }}
              />
              {showMore && (
                <div style={listMoreStyle} className="bg-white shadow-sm rounded-lg w-48">
                  <ListMore
                    onSelect={(key) => {
                      const selectedItem = moreItems.find((item) => item.key === key);
                      if (selectedItem?.href) {
                        navigate(selectedItem.href);
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
            <div>
              <Report />
            </div>
          </div>
        </div>
        <div className="col-span-10">{content}</div>
      </div>
    </div>
  );
};
