import { ElementEqual, Moon, Notification, Play, SmsNotification } from 'iconsax-react';
import { Button, Avatar, Divider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@heroui/use-theme';

import AvatarUser from '../assets/img/inpersonate-avatar.png';
import { HourGlass, Logo } from '../icons';

import AppBreadcrumb from './AppBreadCrumb';
import { AppButton } from 'core/components';

const AppHeader = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPages, setCurrentPages] = useState<string[]>([]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('Switching theme to:', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter((segment) => segment);

    setCurrentPages(['Home', ...pathSegments]);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

    document.documentElement.style.colorScheme = theme;
    document.body.style.background = theme === 'dark' ? '#04070E' : '#FFFFFF';
    document.body.style.color = theme === 'dark' ? '#FFFFFF' : '#04070E';

    localStorage.setItem('heroui-theme', theme);
  }, [theme]);

  return (
    <div className="flex items-center justify-between pb-8 pt-4 gap-10">
      <button className="flex justify-center items-center w-[80px]" onClick={() => navigate('/')}>
        <Logo />
      </button>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-secondary-1000 text-2xl font-semibold leading-normal">
                {location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')}
              </span>
            </div>
            <div className="flex gap-2 mb-2">
              <ElementEqual className="text-neutral-400 dark:text-white" size="18" variant="Bold" />
              <AppBreadcrumb pages={currentPages} />
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <div className="flex gap-2">
              <AppButton
                props={{
                  color: 'primary',
                  variant: 'bordered',
                  size: 'md',
                  radius: 'md',
                  content: <Play size="24" />,
                }}
              />
              <AppButton
                props={{
                  color: 'primary',
                  variant: 'bordered',
                  size: 'md',
                  radius: 'md',
                  content: t('ed_tour'),
                }}
              />
              <AppButton
                props={{
                  color: 'primary',
                  variant: 'bordered',
                  radius: 'md',
                  size: 'md',
                  content: t('upgrade'),
                }}
              />
            </div>
            <div className="flex gap-1">
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'solid',
                  radius: 'md',
                  size: 'md',
                  onPress: () => toggleTheme(),
                  content: <Moon size="20" />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'solid',
                  radius: 'md',
                  size: 'md',
                  content: <Notification size="20" />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'solid',
                  radius: 'md',
                  size: 'md',
                  content: <SmsNotification size="20" />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'solid',
                  radius: 'md',
                  size: 'md',
                  content: <HourGlass size="20" />,
                }}
              />
            </div>
            <div>
              <Avatar radius="sm" src={AvatarUser} />
            </div>
          </div>
        </div>
        <Divider className="bg-primary-400" />
      </div>
    </div>
  );
};

export default AppHeader;
