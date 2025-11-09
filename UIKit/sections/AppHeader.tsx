import { Moon, Sun1, Notification, SmsNotification } from 'iconsax-react';
import { Avatar, Divider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

import { AppButton } from '@hrbox/uikit/components';
import { AppBreadcrumb } from '@hrbox/uikit/sections';
import { Logo, LogoHRLink } from '@hrbox/uikit/icons';
import { useTheme } from '@hrbox/core/hooks/useTheme';
import { useAuth } from '@hrbox/core/hooks/useAuth';
import { useRoleAccess } from '@hrbox/core/hooks/useRoleAccess';
import { Panel, RoleSlug } from '@core/config/design';
import { RoleSwitcher } from '@hrbox/core/components/RoleSwitcher';

export const AppHeader = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { isDark, toggle } = useTheme();
  const { currentPanel, user } = useAuth();
  const { isSuperAdmin, isOrganization } = useRoleAccess();

  const [currentPages, setCurrentPages] = useState<string[]>([]);

  const isHRBox = currentPanel === Panel.HRBOX;
  const isHRLink = currentPanel === Panel.HRLINK;
  const isSuperAdminPanel = currentPanel === Panel.SUPER_ADMIN;

  // بروزرسانی breadcrumb
  useEffect(() => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment);
    setCurrentPages(['Home', ...pathSegments]);
  }, [location]);

  return (
    <div className="flex items-center justify-between pb-4 pt-4 gap-6 border-b border-neutral-200 dark:border-neutral-700">
      {/* Logo */}
      <div className="flex justify-center items-center min-w-fit">
        {isHRBox ? <Logo /> : isHRLink ? <LogoHRLink /> : <Logo />}
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full gap-2">
        {/* Title & Breadcrumb */}
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2 flex-1">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
              {location.pathname
                .split('/')
                .filter(Boolean)
                .pop()
                ?.replace(/-/g, ' ')
                .toUpperCase()}
            </h1>

            {/* Breadcrumb */}
            {(isHRBox || isSuperAdminPanel) && (
              <div className="flex items-center gap-2">
                <AppBreadcrumb pages={currentPages} />
              </div>
            )}
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <AppButton
              props={{
                isIconOnly: true,
                variant: 'light',
                color: 'default',
                radius: 'md',
                size: 'md',
                onPress: toggle,
                content: isDark ? <Sun1 size="20" /> : <Moon size="20" />,
              }}
            />

            {/* Notifications */}
            <AppButton
              props={{
                isIconOnly: true,
                variant: 'light',
                color: 'default',
                radius: 'md',
                size: 'md',
                content: <Notification size="20" />,
              }}
            />

            {/* Messages */}
            <AppButton
              props={{
                isIconOnly: true,
                variant: 'light',
                color: 'default',
                radius: 'md',
                size: 'md',
                content: <SmsNotification size="20" />,
              }}
            />

            {/* Divider */}
            <Divider orientation="vertical" className="h-6" />

            {/* Role Switcher & Avatar */}
            <div className="flex items-center gap-2">
              <RoleSwitcher />
              <Avatar
                radius="sm"
                size="sm"
                src={user?.avatar || ''}
                name={user?.name || 'User'}
                className="bg-primary-100 dark:bg-primary-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};