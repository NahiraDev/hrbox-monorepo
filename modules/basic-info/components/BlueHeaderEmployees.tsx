import { Avatar, Button } from '@heroui/react';
import { FolderCross } from 'iconsax-react';
import { MessageEdit, Trash } from 'iconsax-react';

import { AppButton } from '../../../core';
import AppTab from '../components/AppTab';
const BlueHeaderEmployees = () => {
  return (
    <div className="bg-primary-400 w-full rounded-t-2xl">
      <div className="flex items-center justify-between  ">
        <div className="px-7 py-4 ">
          <Avatar className="w-45 h-45 z-10" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          TODO
          <div className="flex gap-1 absolute z-100">
            <AppButton
              props={{
                size: 'sm',
                radius: '',
                color: 'white',
                onPress: () => {},
                content: (
                  <div>
                    <MessageEdit className="text-secondary-900" />
                  </div>
                ),
              }}
            />
            <AppButton
              props={{
                size: 'sm',
                radius: '',
                color: 'white',
                onPress: () => {},
                content: (
                  <div>
                    <Trash className="text-secondary-900" />
                  </div>
                ),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between pr-4 pt-4 w-full">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold ">Parisa Babie</span>
              <span className="text-lg">Product Designer</span>
              <span className="text-lg">
                Place of Service: <span className="text-lg font-bold">Headquarters Office</span>
              </span>
            </div>
            <div className="flex items-start ">
              <Button color="danger">
                <FolderCross />
                End of Work Relationship
              </Button>
            </div>
          </div>
          <div className="flex items-start justify-center">
            <AppTab color="danger" isDisabled={false} noBackground={true} radius="sm" textSize="xxl" variant="light" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlueHeaderEmployees;
