import { guidlines } from '@module/basic-info/app/mock';
import { Card, Avatar } from '@heroui/react';
import { Add, Category, Profile2User, UserSearch } from 'iconsax-react';

import { BasicInfoLayout } from '@module/basic-info/features/common';
import { AppButton, useModalContext } from '@root/core';
import { GuidelinesModal } from '@module/basic-info/features/employees/modals/GuidelinesModal';
import { GuidelinesShowModeModal } from '@module/basic-info/features/employees/modals/GuidelinesShowModeModal';
const Guidelines = () => {

  const { openModal } = useModalContext();

  return (
    <BasicInfoLayout
      content={
        <div className="p-2 overflow-y-auto max-h-[550px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xl font-semibold text-secondary-900 p-3">
              <UserSearch size="26" />
              <span>Guidlines</span>
            </div>
            <div className="pr-5">
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  color: 'white',
                  variant: 'solid',
                  onPress: () => openModal('edit',"", <GuidelinesModal />,undefined,"sm","Add New Guidlines", <UserSearch className='text-white'/> ),
                  isIconOnly: true,
                  className: 'bg-white border-1 border-primary-400 p-2',
                  content: <Add className="text-secondary-900" size="20" />,
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-3 p-2">
            {guidlines.map((guidline, index) => (
              <Card
                onPress={() =>
                  openModal(
                    'edit',
                    '',
                    <GuidelinesShowModeModal />,
                    undefined,
                    'sm',
                    'Guidlines',
                    <UserSearch className="text-white" />
                  )
                }
                isPressable
                key={index} className="flex justify-center items-center gap-3  p-4 border border-[#DCF0F9]">
                <Avatar className="w-30 h-30 text-white" radius="lg" src="" color="primary" />
                <span className="text-xs font-semibold text-secondary-900">{guidline.job}</span>
              </Card>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Guidelines;
