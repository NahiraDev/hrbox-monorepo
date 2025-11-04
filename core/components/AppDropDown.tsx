import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import { useState } from 'react';
// import React from 'react';

interface AppDropDownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}
interface AppDropDownProps {
  title?: string;
  item: AppDropDownItem[];
  className?: string;
  EndIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
  classNames?:string;
}
const AppDropDown = ({ props }: { props: AppDropDownProps }) => {
  const { title, item, className,EndIcon,startIcon } = props;
  const [selected, setSelected] = useState<AppDropDownItem | null>(item.length > 0 ? item[0] : null);
  const handleSelect = (key: string) => {
    const found = item.find((item) => item.key === key);

    if (found) {
      setSelected(found);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className={`flex flex-row items-center ${className}`} variant='bordered'>
          <span>{startIcon}</span>
          {title
            ? title
            : selected && (
                <span className='flex flex-row items-center gap-1'>
                  {selected.icon}
                  {selected.label}
                </span>
              )}
          <span>{EndIcon}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Dynamic Actions'
        className='flex flex-row justify-between'
        items={item}
        onAction={key => handleSelect(key as string)}
      >
        {item => (
          <DropdownItem
            key={item.key}
            className='flex w-full flex-row justify-center'
            classNames={{base:'hover:bg-[#DCF0F940]'}}
          >
            <span className='flex flex-row items-center gap-1'>
              {item.icon}
              {item.label}
            </span>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default AppDropDown;
