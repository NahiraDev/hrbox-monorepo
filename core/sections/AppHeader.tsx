import {
  ElementEqual,
  Moon,
  Notification,
  Play,
  SmsNotification,
} from 'iconsax-react';
import { Button, Avatar, Divider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@heroui/use-theme';

import AvatarUser from '../assets/img/inpersonate-avatar.png';
import { HourGlass, Logo } from '../icons';

import AppBreadcrumb from './AppBreadCrumb';

const AppHeader = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPages, setCurrentPages] = useState<string[]>([]);
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    const pathSegments = location.pathname
      .split('/')
      .filter((segment) => segment);

    setCurrentPages(['Home', ...pathSegments]);
  }, [location]);

  return (
    <div className="flex items-center justify-between pb-8 pt-4 gap-10">
      <button
        className="flex justify-center items-center w-[80px]"
        onClick={() => navigate('/')}
      >
        <Logo />
      </button>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-secondary-1000 dark:text-white text-2xl font-semibold leading-normal">
                {location.pathname
                  .split('/')
                  .filter(Boolean)
                  .pop()
                  ?.replace(/-/g, ' ')}
              </span>
            </div>
            <div className="flex gap-2 mb-2">
              <ElementEqual
                className="text-netural-400 dark:text-netural-600"
                size="18"
                variant="Bold"
              />
              <AppBreadcrumb pages={currentPages} />
            </div>
          </div>
          <div className="flex gap-2 mb-3">
            <div className="flex gap-2">
              <Button
                isIconOnly
                className="bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200"
                variant="light"
              >
                <Play
                  className="text-secondary-1000 dark:text-white"
                  size="24"
                />
              </Button>
              <Button
                className="bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200"
                variant="light"
              >
                <span className="text-secondary-1000 dark:text-white font-semibold">
                  {t('ed_tour')}
                </span>
              </Button>
              <Button
                className="bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200"
                variant="light"
              >
                <span className="text-secondary-1000 dark:text-white font-semibold">
                  {t('upgrade')}
                </span>
              </Button>
            </div>
            <div className="flex gap-1">
              <Button isIconOnly variant="light" onPress={() => toggleTheme()}>
                <Moon
                  className="text-secondary-1000 dark:text-white"
                  size="20"
                  variant={theme === 'dark' ? 'Bold' : 'Outline'}
                />
              </Button>

              <Button isIconOnly variant="light">
                <Notification
                  className="text-secondary-1000 dark:text-white"
                  size="20"
                />
              </Button>
              <Button isIconOnly variant="light">
                <SmsNotification
                  className="text-secondary-1000 dark:text-white"
                  size="20"
                />
              </Button>
              <Button isIconOnly variant="light">
                <HourGlass size="20" />
              </Button>
            </div>
            <div>
              <Avatar radius="sm" src={AvatarUser} />
            </div>
          </div>
        </div>
        <Divider className="bg-primary dark:bg-surface-200" />
      </div>
    </div>
  );
};

export default AppHeader;
