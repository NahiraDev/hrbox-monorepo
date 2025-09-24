import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react';
import React from 'react';

interface AppDropDownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}
interface AppDropDownProps {
  title?: string;
  item: AppDropDownItem[];
  className?: string;
}
const AppDropDown = ({ props }: { props: AppDropDownProps }) => {
  const { title, item, className } = props;
  const [selected, setSelected] = React.useState<AppDropDownItem | null>(item.length > 0 ? item[0] : null);
  const handleSelect = (key: string) => {
    const found = item.find((item) => item.key === key);

    if (found) {
      setSelected(found);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className={className} variant="bordered">
          {title
            ? title
            : selected && (
                <span className="flex flex-row items-center gap-1">
                  {selected.icon}
                  {selected.label}
                </span>
              )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="flex flex-row justify-between"
        items={item}
        onAction={(key) => handleSelect(key as string)}
      >
        {(item) => (
          <DropdownItem key={item.key} className="w-full flex flex-row justify-center">
            <span className="flex flex-row items-center gap-1">
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
