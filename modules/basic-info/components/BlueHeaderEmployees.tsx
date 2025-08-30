import { Tabs, Tab, Avatar, Button } from '@heroui/react';
import { FolderCross } from 'iconsax-react';
import { MessageEdit, Trash } from 'iconsax-react';

import { AppButton } from '../../../core';
const BlueHeaderEmployees = () => {
  return (
    <div className="bg-primary-400 max-w-419 rounded-t-2xl">
      <div className="flex items-center justify-between  ">
        <div className="px-7 py-4 ">
          <Avatar
            className="w-45 h-45 z-10"
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
          <div className="flex gap-1 absolute z-100 left-29.5  top-38  ">
            <AppButton
              props={{
                className: 'bg-white p-2',
                size: '',
                radius: '',
                onPress: () => {},
                content: (
                  <div>
                    <MessageEdit className="text-[#080E1C]" />
                  </div>
                ),
              }}
            />
            <AppButton
              props={{
                className: 'bg-white p-2  ',
                size: '',
                radius: '',
                onPress: () => {},
                content: (
                  <div>
                    <Trash className="text-[#080E1C] " />
                  </div>
                ),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-13 pr-4 pt-4  w-full ">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold ">Parisa Babie</span>
              <span className="text-lg">Product Designer</span>
              <span className="text-lg">
                Place of Service:{' '}
                <span className="text-lg font-bold">Headquarters Office</span>
              </span>
            </div>
            <div className="flex items-start ">
              <Button color="danger">
                <FolderCross />
                End of Work Relationship
              </Button>
            </div>
          </div>
          <div>
            <Tabs
              classNames={{
                tabList: 'bg-transparent mb-[-3px]',
                tab: 'px-3 py-1 rounded-none text-gray-100', // تب غیر فعال
                cursor: 'bg-red-500',
              }}
            >
              <Tab
                key="Personal Information"
                className="w-38"
                title="Personal Information"
              />
              <Tab key="Documents" className="w-38 " title="Documents" />
              <Tab key="Jobs" className="w-38" title="Jobs" />
              <Tab key="Educations" className="w-38" title="Educations" />
              <Tab key="SkillsCourses" className="w-38" title="SkillsCourses" />
              <Tab key="Courses" className="w-38" title="Courses" />
              <Tab key="Achivements" className="w-38" title="Achivements" />
              <Tab key="Dependents" className="w-38" title="Dependents" />
              <Tab key="More" className="w-38" title="More" />
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueHeaderEmployees;
