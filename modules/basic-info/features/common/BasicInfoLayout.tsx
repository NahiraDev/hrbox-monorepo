import type { Key, ReactNode } from 'react';
import { DynamicAddModal } from '@module/basic-info/features/employees/modals/DynamicAddModal';
import { AppButton, AppDeleteModal } from '@hrbox/uikit/components';
import { Add, Category, FolderCross, MessageEdit, Trash } from 'iconsax-react';
import { Listbox, ListboxItem } from '@heroui/react';
import { useEffect, useState, useRef } from 'react';
import { AppTabs } from '@hrbox/uikit/components';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';
import Report from '@module/basic-info/features/common/Repport';
import { BasicInfoPaths } from '@module/basic-info/app/paths';

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

const moreItems: MoreItem[] = [
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

// ==================== COMPONENTS ====================
const ListMore = ({ onSelect }: { onSelect: (key: Key) => void }) => (
  <Listbox
    aria-label="More Actions"
    items={moreItems}
    onAction={onSelect}
    className="absolute w-[216px] bg-white shadow-sm rounded-lg z-10 p-3"
  >
    {(item: MoreItem) => (
      <ListboxItem key={item.key} className="hover:bg-primary-100">
        {item.label}
      </ListboxItem>
    )}
  </Listbox>
);

const ProfileActions = ({ openModal }: { openModal: any }) => (
  <div className="flex gap-1">
    <AppButton
      props={{
        size: 'xs', radius: 'sm', color: 'white', variant: 'solid',
        className: 'p-1 bg-white hover:!bg-primary transition-all duration-200 w-7 h-7',
        content: <MessageEdit className="text-secondary-1000 group-hover:text-white" size={20} />,
      }}
    />
    <AppButton
      props={{
        size: 'xs', radius: 'sm', variant: 'light', isIconOnly: true,
        onPress: () => openModal('delete', '', <AppDeleteModal />, undefined, 'lg', 'Do you want to remove it?', <Trash className="text-white" />),
        content: <Trash className="text-secondary-1000 group-hover:text-white" size={20} />,
        className: 'p-1 bg-white hover:!bg-red-500 transition-all duration-200 w-7 h-7',
      }}
    />
  </div>
);

const AddButton = ({ tab, openModal }: { tab: string; openModal: any }) => {
  const getModalTitle = () => {
    const titleMap: Record<string, string> = {
      jobs: 'Job', education: 'Education', skills: 'Skill',
      courses: 'Course', achievements: 'Achievement'
    };
    return `Add New ${titleMap[tab as keyof typeof titleMap] || 'Item'}`;
  };

  return (
    <AppButton
      props={{
        className: 'bg-white',
        size: 'md',
        radius: 'sm',
        onPress: () => openModal(
          'edit', '',
          <DynamicAddModal tab={tab} onClose={() => {}} />,
          undefined, '3xl',
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
);

// ==================== MAIN COMPONENT ====================
export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
  const { openModal } = useModalContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState(() => {
    const currentTab = EmployeesTab.find(tab => tab.href && pathname.includes(tab.href));
    return currentTab?.key || 'personal-information';
  });

  const [showMore, setShowMore] = useState(false);
  const moreTabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTab = EmployeesTab.find(tab => tab.href && pathname.includes(tab.href));
    if (currentTab) setSelectedTab(currentTab.key);
  }, [pathname]);

  // Button Logic
  const showRedButton = selectedTab === 'personal-information';
  const showWhiteButton = TABS_WITH_ADD_BUTTON.includes(selectedTab);
  const hideButtons = TABS_WITHOUT_BUTTONS.includes(selectedTab);

  // ListMore Position
  const listMoreStyle: React.CSSProperties = {};
  if (moreTabRef.current && showMore) {
    const rect = moreTabRef.current.getBoundingClientRect();
    Object.assign(listMoreStyle, {
      position: 'absolute',
      top: `${rect.bottom + window.scrollY}px`,
      left: `${rect.left + window.scrollX + 10}px`,
      zIndex: 50,
    });
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-primary-400 w-full rounded-t-xl px-4 pt-4">
        <div className="flex items-center justify-between gap-7">
          {/* Profile Image & Actions */}
          <div className="w-36 h-36 rounded-lg relative"
               style={{ backgroundImage: `url('https://i.pravatar.cc/150?u=a04258a2462d826712d')`, backgroundSize: 'cover' }}>
            <div className="absolute top-1 right-1">
              <ProfileActions openModal={openModal} />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between w-full gap-7">
            {/* Employee Info & Buttons */}
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
                    {showRedButton && <EndWorkButton />}
                    {showWhiteButton && <AddButton tab={selectedTab} openModal={openModal} />}
                  </>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="relative">
              <AppTabs
                fullWidth
                classNames={{
                  base: '!p-0',
                  tabList: 'bg-transparent !p-0 rounded-none',
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
                    setShowMore(prev => !prev);
                  } else {
                    setSelectedTab(key);
                    setShowMore(false);
                  }
                }}
                ref={(el) => {
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
                      const item = moreItems.find(item => item.key === key);
                      item?.href && navigate(item.href);
                      setShowMore(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="overflow-y-auto"><Report /></div>
        </div>
        <div className="col-span-10">
          {content}
        </div>
      </div>
    </div>
  );
};
