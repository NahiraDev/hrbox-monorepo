import { Tabs, Tab } from '@heroui/react';
import React from 'react';

type EmployeeTab = {
  title: string;
};

export const EmployeesTab: EmployeeTab[] = [
  { title: 'Personal Information' },
  { title: 'Documents' },
  { title: 'Jobs' },
  { title: 'Educations' },
  { title: 'Skills' },
  { title: 'Courses' },
  { title: 'Achievements' },
  { title: 'Dependents' },
  { title: 'More' },
];

type AppTabsProps = {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isDisabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  noBackground?: boolean;
  variant?: 'solid' | 'underlined' | 'bordered' | 'light';
  textSize?: 'xxs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl';
};

const AppTabs: React.FC<AppTabsProps> = ({
  color = 'primary',
  isDisabled = false,
  size = 'md',
  radius = 'sm',
  noBackground = false,
  variant = 'solid',
}) => {
  return (
    <Tabs
      aria-label="Employee Tabs"
      color={color}
      isDisabled={isDisabled}
      radius={radius}
      size={size}
      style={{ background: noBackground ? 'transparent' : undefined, display: 'flex' }}
      variant={variant}
    >
      {EmployeesTab.map((tab, index) => (
        <Tab
          key={index}
          style={{
            background: noBackground ? 'transparent' : undefined,
            marginRight: index !== EmployeesTab.length - 1 ? 14 : 0, // فاصله 8px بین تب‌ها
          }}
          title={tab.title}
        />
      ))}
    </Tabs>
  );
};

export default AppTabs;
