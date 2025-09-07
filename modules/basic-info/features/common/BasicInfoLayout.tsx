import { TickIcon } from 'core/icons';
import { AppButton } from 'core/components';
import { FolderCross, MessageEdit, Trash } from 'iconsax-react';
import { Avatar } from '@heroui/react';
import { Button } from '@heroui/button';
import { type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { AppTabs } from '../../../../core';

const EmployeesTab = [
  { key: 'personal-information', title: 'Personal Information', href: '/basic-info/PersonalInformation' },
  { key: 'documents', title: 'Documents', href: '/basic-info/Documents' },
  { key: 'jobs', title: 'Jobs', href: '/basic-info/Jobs' },
  { key: 'education', title: 'Educations', href: '/basic-info/Education' },
  { key: 'skills', title: 'Skills', href: '/basic-info/Skills' },
  { key: 'courses', title: 'Courses', href: '/basic-info/Courses' },
  { key: 'achievements', title: 'Achievements', href: '/basic-info/Achievements' },
  { key: 'dependents', title: 'Dependents', href: '/basic-info/Dependents' },
  { key: 'more', title: 'More', href: '/basic-info/More' },
];

export const BasicInfoLayout = ({ content }: { content: ReactNode }) => {
  const { pathname } = useLocation();
  const [selectedTab, setSelectedTab] = useState('personal-information');

  useEffect(() => {
    const currentTab = EmployeesTab.find((tab) => pathname.includes(tab.href));

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
              <TickIcon color="#0B76B7" />
              <div className="flex gap-1">
                <AppButton
                  props={{
                    size: 'xs',
                    radius: 'sm',
                    color: 'white',
                    variant: 'solid',
                    isIconOnly: true,
                    className: 'bg-white',
                    content: <MessageEdit className="text-secondary-900" size="20" />,
                  }}
                />
                <AppButton
                  props={{
                    size: 'xs',
                    radius: 'sm',
                    color: 'white',
                    variant: 'solid',
                    isIconOnly: true,
                    className: 'bg-white',
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
              </div>
            </div>
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
              onSelectionChange={(key: string) => setSelectedTab(key)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div
            className="p-4 overflow-y-auto w-70
            [&::-webkit-scrollbar]:w-3
            [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300"
          >
            <div>
              <span>Report To</span>
              <div className="flex justify-between items-center  mb-4 mt-2">
                <div>
                  <Avatar className="w-10 h-10" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-info-400 text-xs">Zahra Pakniyat</span>
                  <Button className="h-5 text-primary-400 bg-[#DCF0F966]/40 border-1 border-primary-400 text-[10px] w-full ">
                    uiUx designer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-10">{content}</div>
      </div>
    </div>
  );
};
