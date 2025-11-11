import { AppButton, AppInput } from '@hrbox/uikit/components';
import { ArrowDown2, Edit, Eye, LayoutMaximize, SearchNormal1, Setting4, User } from 'iconsax-reactjs';
import { useState } from 'react';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';

import { departmentUnit } from '@module/chart-maker/app/mock';
import { useModalContext } from '@hrbox/core/providers/ModalProvider';

export const users = [
  { id: 1, name: 'Haircut', position: 'Front End Developer' },
  { id: 2, name: 'Nails', position: 'Front End Developer' },
  { id: 3, name: 'Facial', position: 'Front End Developer' },
];

export const OrgChartHeader = ({ wrapperRef }: any) => {
  const { openModal } = useModalContext();
  const [query, setQuery] = useState('');

  const results = users.filter((item: any) => item.name.toLowerCase().includes(query.toLowerCase()));
  const toggleFullscreen = () => {
    if (!document.fullscreenElement && wrapperRef.current) {
      wrapperRef.current.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


  return (
    <div>
      <div className="grid grid-cols-3 items-center px-3 py-4 bg-white shadow-light-tight-2 absolute z-50 w-full justify-between top-0 left-0">
        <div className="flex items-center justify-start gap-2">
          <AppButton
            props={{
              size: 'xs',
              color: 'primary',
              variant: 'bordered',
              onPress: () => openModal('confirm', 'Test'),
              content: <Edit className="text-secondary-1000" size={24} />,
            }}
          />
          <AppButton
            props={{
              size: 'xs',
              color: 'primary',
              variant: 'solid',
              onPress: () => openModal('custom', 'Attention'),
              content: <Eye className="text-white" size={24} />,
            }}
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <AppButton
            props={{
              size: 'xs',
              color: 'primary',
              variant: 'bordered',
              content: <ArrowDown2 className="text-secondary-1000" size={24} />,
            }}
          />
          {/*<Counter />*/}
          <AppButton
            props={{
              color: 'primary',
              size: 'xs',
              onPress: toggleFullscreen,
              variant: 'bordered',
              content: <LayoutMaximize className="text-secondary-1000" size={24} />,
            }}
          />
        </div>
        <div className=" flex items-center justify-end gap-1.5">
          <div className="relative">
            <AppInput
              props={{
                color: 'primary',
                variant: 'bordered',
                startContent: <SearchNormal1 className="text-secondary-1000" size={24} />,
                value: query,
                onChange: (e: any) => setQuery(e.target.value),
              }}
            />
            {!query && (
              <div className="mt-1 bg-white rounded-lg shadow p-3 absolute flex flex-col gap-1 w-full">
                {results.length > 0 &&
                  results.map((item) => (
                    <div key={item.id} className="p-2 rounded cursor-pointer">
                      <img alt="" src="https://placehold.co/28x28" />
                      <span className="text-secondary-1000 font-[8px]">{item.name}</span>
                      <Chip color="primary" variant="bordered">
                        {item.position}
                      </Chip>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button className="" color="primary" variant="bordered">
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Setting4 className="w-5 h-5 text-black dark:text-white" />
                    <span>Department/Unit</span>
                  </div>
                  <ArrowDown2 className="w-5 h-5 dark:text-white transition-transform" />
                </div>
              </Button>
            </DropdownTrigger>

            <DropdownMenu>
              {departmentUnit.map((item) => (
                <DropdownItem key={item.value} className="px-3 py-2 cursor-pointer hover:bg-blue-100">
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <AppButton
            props={{
              size: 'xs',
              color: 'primary',
              variant: 'bordered',
              content: <User className="text-secondary-1000" size={24} />,
            }}
          />
        </div>
      </div>
    </div>
  );
};
