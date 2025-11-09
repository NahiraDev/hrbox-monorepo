import { ArrowRight2, ArrowLeft2, Setting2, Global, LogoutCurve } from 'iconsax-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from '@tanstack/react-router';

import { AppButton } from '@hrbox/uikit/components';
import { useAppDispatch, useAppSelector } from '@hrbox/core/redux/hooks';
import { useLanguage } from '@hrbox/core/hooks/useLanguage';
import { useAuth } from '@hrbox/core/hooks/useAuth';
import { moduleRegistry } from '@hrbox/modules/registry';
import { useLogout } from "@core/hooks/useLogout";

export const AppSideBar = () => {
  const { t } = useTranslation();
  const {push} = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Hooks جدید
  const { lang } = useLanguage();
  const { logout, currentPanel } = useAuth();

  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | undefined>('');
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Bottom menu items
  const bottomMenu = [
    {
      icon: <Setting2 size="24" />,
      name: t('generalSetting'),
      action: 'settings',
    },
    {
      icon: <Global size="24" />,
      name: lang === 'fa' ? t('persian') : t('english'),
      action: 'language',
    },
    {
      icon: <LogoutCurve size="24" />,
      name: t('logout'),
      action: 'logout',
    },
  ];


  const handleNavigate = (item: any) => {
    setActiveTab(item.label);
    push({ to: item.path });
  };

  const handleBottomMenuAction = (action: string) => {
    switch (action) {
      case 'settings':
        push({ to: '/settings' });
        break;
      case 'language':
        useLanguage();
        break;
      case 'logout':
        useLogout();
        break;
      default:
        break;
    }
  };

  // بارگذاری منوی ماژول
  useEffect(() => {
    if (currentPanel) {
      const module = moduleRegistry.getModule(currentPanel);
      if (module?.menu) {
        setMenuItems(module.menu);
      }
    }
  }, [currentPanel]);

  useEffect(() => {
    const activeItem = menuItems.find((item) => item.path === location.pathname);
    if (activeItem) {
      setActiveTab(activeItem.label);
    }
  }, [location.pathname, menuItems]);

  return (
    <div
      className={`
        relative flex flex-col rounded-lg py-4 px-4 bg-panel-surface shadow-theme-md
        dark:shadow-theme-lg transition-all duration-300
        ${!fullWidth ? 'w-[100px]' : 'w-[220px]'}
      `}
    >
      {/* Toggle Button */}
      <AppButton
        props={{
          className: 'absolute top-[50px] -right-3 shadow-theme-sm bg-panel-surface z-10',
          color: 'primary',
          variant: 'solid',
          size: 'xs',
          radius: 'full',
          isIconOnly: true,
          onPress: () => setFullWidth(!fullWidth),
          content: (
            fullWidth ? (
              <ArrowLeft2 size="12" />
            ) : (
              <ArrowRight2 size="12" />
            )
          ),
        }}
      />

      {/* Menu Items */}
      <div className="flex flex-col items-center justify-between w-full h-full">
        {/* Top Menu */}
        <div
          className={`
            flex flex-col w-full pb-3 gap-2
            ${fullWidth ? 'items-start pl-2' : 'items-center'}
          `}
        >
          {menuItems.map((item: any) => (
            <AppButton
              key={item.label}
              props={{
                className: `
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                  ${
                  activeTab === item.label
                    ? 'bg-primary-100 dark:bg-primary-700'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }
                `,
                isIconOnly: !fullWidth,
                color: activeTab === item.label ? 'primary' : 'default',
                variant: 'light',
                size: 'md',
                onPress: () => handleNavigate(item),
                content: (
                  <div className="flex items-center gap-2 w-full">
                    <span
                      className={`
                        text-lg
                        ${activeTab === item.label ? 'text-primary' : 'text-secondary-500'}
                      `}
                    >
                      {item.icon}
                    </span>
                    {fullWidth && (
                      <span
                        className={`
                          text-xs font-medium whitespace-nowrap
                          ${activeTab === item.label ? 'text-primary' : 'text-secondary-600'}
                        `}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                ),
              }}
            />
          ))}
        </div>

        {/* Bottom Menu */}
        <div className={`flex flex-col w-full gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700`}>
          {bottomMenu.map((item) => (
            <AppButton
              key={item.action}
              props={{
                className: `
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                  hover:bg-neutral-100 dark:hover:bg-neutral-800
                `,
                isIconOnly: !fullWidth,
                color: 'default',
                variant: 'light',
                size: 'md',
                onPress: () => handleBottomMenuAction(item.action),
                content: (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-lg text-secondary-500">{item.icon}</span>
                    {fullWidth && (
                      <span className="text-xs font-medium text-secondary-600 whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                ),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};