import { Tabs, Tab } from '@heroui/react';
import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

type TabSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type TabRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type TabVariant = 'solid' | 'underlined' | 'bordered' | 'light';
type TabColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

interface TabItem {
  title: string;
  href?: string;
  content?: React.ReactNode;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  key?: string | number;
}

interface AppTabsProps {
  tabs: TabItem[];
  color?: TabColor;
  radius?: TabRadius;
  variant?: TabVariant;
  isDisabled?: boolean;
  className?: string;
  size?: TabSize;
  orientation?: 'horizontal' | 'vertical';
  placement?: 'top' | 'bottom' | 'start' | 'end';
  selectedKey?: string | number;
  defaultSelectedKey?: string | number;
  destroyInactiveTabPanel?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
  isVertical?: boolean;
  motionProps?: any;
  classNames?: {
    base?: string;
    tabList?: string;
    tab?: string;
    tabContent?: string;
    cursor?: string;
    panel?: string;
  };
  onTabChange?: (key: string | number) => void;
}

const sizeClasses: Record<TabSize, string> = {
  xs: 'p-1.5 text-xs',
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
  xl: 'px-6 py-4 text-xl',
  xxl: 'px-8 py-6 text-2xl',
};

const radiusClasses: Record<TabRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

const AppTabs: React.FC<AppTabsProps> = ({
  tabs,
  color = 'primary',
  isDisabled = false,
  size = 'md',
  radius = 'sm',
  variant = 'solid',
  className,
  placement = 'top',
  selectedKey,
  defaultSelectedKey,
  destroyInactiveTabPanel = false,
  ariaLabel = 'Dynamic Tabs',
  fullWidth = false,
  isVertical = false,
  motionProps,
  classNames,
  onTabChange,
  ...rest
}) => {
  const navigate = useNavigate();

  const handleSelectionChange = (key: string | number) => {
    if (onTabChange) {
      onTabChange(key);
    }

    // اگر تب href داشته باشد، navigation انجام می‌دهد
    const selectedTab = tabs.find((tab) => tab.key === key || tab.href === key);
    if (selectedTab?.href) {
      navigate(selectedTab.href);
    }
  };

  return (
    <Tabs
      aria-label={ariaLabel}
      className={clsx(sizeClasses[size], radiusClasses[radius], fullWidth && 'w-full', className)}
      classNames={classNames}
      color={color}
      defaultSelectedKey={defaultSelectedKey}
      destroyInactiveTabPanel={destroyInactiveTabPanel}
      isDisabled={isDisabled}
      isVertical={isVertical}
      motionProps={motionProps}
      placement={placement}
      selectedKey={selectedKey}
      variant={variant}
      onSelectionChange={handleSelectionChange}
      {...rest}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={tab.key || index}
          href={tab.href}
          isDisabled={tab.isDisabled}
          title={
            <div className="flex items-center gap-2">
              {tab.icon}
              <span>{tab.title}</span>
            </div>
          }
        >
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  );
};

export default AppTabs;
