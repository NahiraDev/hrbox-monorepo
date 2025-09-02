import { Tabs, Tab } from '@heroui/react';
import React from 'react';

type EmployeeTab = {
  title: string;
  href: string;
};

export const EmployeesTab: EmployeeTab[] = [
  { title: 'Personal Information', href: '/personal-information' },
  { title: 'Documents', href: '/basic-info/Documents' },
  { title: 'Jobs', href: '/basic-info/Jobs' },
  { title: 'Educations', href: '/basic-info/Education' },
  { title: 'Skills', href: '/basic-info/Skills' },
  { title: 'Courses', href: '/basic-info/Courses' },
  { title: 'Achievements', href: '/basic-info/Achievements' },
  { title: 'Dependents', href: '/basic-info/Dependents' },
  { title: 'More', href: '/basic-info/More' },
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
          as="a"
          href={tab.href}
          style={{
            background: noBackground ? 'transparent' : undefined,
            marginRight: index !== EmployeesTab.length - 1 ? 14 : 0,
          }}
          title={tab.title}
        />
      ))}
    </Tabs>
  );
};

export default AppTabs;
