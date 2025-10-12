  import type { Key } from 'react';

  // import { TickIcon } from '../../../../public/icons';
  import { AppButton, AppDeleteModal } from '@core/components';
  import { Add, Category, FolderCross, MessageEdit, Trash } from 'iconsax-react';
  import { Listbox, ListboxItem } from '@heroui/react';
  import { type ReactNode, useEffect, useState } from 'react';
  import { useLocation } from 'react-router-dom';

  import { AppTabs } from '@core/components';
  import { useModalContext } from '@core/context';
  import Report from '@module/basic-info/features/common/Repport';
  import AddNewCourses from '@module/basic-info/features/employees/modals/AddNewCourses';
  import { BasicInfoPaths } from '@module/basic-info/app/paths';

  const EmployeesTab = [
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

  const moreItems = [
    { key: '1', label: 'Organization-Specific Information', href: '/basic-info/SpecificInformation' },
    { key: '2', label: 'Onboarding', href: '/basic-info/Onboarding' },
    { key: '3', label: 'Offboarding' },
    { key: '4', label: 'Guidelines' },
    { key: '5', label: 'Test Report' },
    { key: '6', label: 'Contract List' },
    { key: '7', label: 'Request List' },
    { key: '8', label: 'Health Records' },
  ];

  const ListMore = ({ onSelect }: { onSelect: (key: Key) => void }) => {
    return (
      <Listbox aria-label="More Actions" items={moreItems} onAction={onSelect}>
        {(item) => (
          <ListboxItem key={item.key} className="text-[#04070E]" color="primary">
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    );
  };

  ////////////////////////////////////////////////////////////////////////////////

  export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
    const { openModal } = useModalContext();
    const { pathname } = useLocation();
    const [selectedTab, setSelectedTab] = useState('personal-information');
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
      const currentTab = EmployeesTab.find((tab) => tab.href && pathname.includes(tab.href));

      if (currentTab) {
        setSelectedTab(currentTab.key);
      }
    }, [pathname]);

    return (
      <div>
        <div className="bg-primary-400 w-full rounded-t-xl px-4 pt-4 ">
          <div className="flex items-center justify-between gap-7">
            <div
              className="w-36 h-36 rounded-lg"
              style={{ background: `url('https://i.pravatar.cc/150?u=a04258a2462d826712d')` }}
            >
              <div className="flex flex-col justify-between items-end h-full p-1">
                {/*<TickIcon color="#0B76B7" />*/}
                <div className="flex gap-1">
                  <AppButton
                    props={{
                      size: 'xs',
                      radius: 'sm',
                      color: 'white',
                      variant: 'solid',
                      className: 'bg-white p-1',
                      content: <MessageEdit className="text-secondary-900" size="20" />,
                    }}
                  />
                  <AppButton
                    props={{
                      size: 'xs',
                      radius: 'sm',
                      color: 'white',
                      variant: 'solid',
                      className: 'bg-white p-1',
                      content: <Trash className="text-secondary-900" size="20" />,
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
                <div className="flex items-start">
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
                  <AppButton
                    props={{
                      className:"bg-white",
                      size: 'md',
                      radius: 'sm',
                      onPress: () => openModal('edit',"",<AddNewCourses/>, undefined, 'xl',"Software Management",<Category className='text-white'/>),
                      content: (
                        <>
                          <Add size={22} />
                          <span>Add New One</span>
                        </>
                      ),
                    }}
                  />
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
                />
                {showMore && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg z-50 w-48">
                    <ListMore
                      onSelect={(key) => {
                        alert(`Clicked: ${key}`);
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
            <div className="py-4 pl-4 overflow-y-auto">
              <div>
                <Report />
              </div>
            </div>
          </div>
          <div className="col-span-10">{content}</div>
        </div>
        {/*<EducationModals/>*/}

      </div>
    );
  };
  // <span>Report To</span>
  // {dataReportWorker.map((worker, index) => (
  //   <div key={index} className="flex justify-between items-center  mb-4 mt-2">
  //     <div>
  //       <Avatar className="w-10 h-10" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
  //     </div>
  //     <div className="flex flex-col gap-1 items-center">
  //       <span className="text-info-400 text-xs">{worker.name}</span>
  //       <Button className="h-5 text-primary-400 bg-[#DCF0F966]/40 border-1 border-primary-400 text-[10px] w-full ">
  //         {worker.job}
  //       </Button>
  //     </div>
  //   </div>
  // ))}
