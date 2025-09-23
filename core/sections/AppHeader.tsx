import { ElementEqual, Moon, Notification, Play, SmsNotification } from 'iconsax-react';
import { Avatar, Divider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '@heroui/use-theme';
import { AppButton, AppTabs } from '../components';
import { serviceRegistry } from '../helpers';
import { HourGlass, Logo, LogoHRLink } from '../icons';

import AppBreadcrumb from './AppBreadCrumb';

const AppHeader = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPages, setCurrentPages] = useState<string[]>([]);
  const [HRBoxPanel, setHRBoxPanel] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const handleTabChange = (key: string | number) => {
    setActiveTab(key as string);
  };

  const getHRLinkPath = (path: string) => {
    const basePath = '/hrlink';

    if (location.pathname.includes(basePath)) {
      return `${basePath}${path}`;
    }

    return path;
  };
  const pageTabs = [
    {
      key: 'dashboard',
      title: 'Dashboard',
      href: getHRLinkPath('/dashboard'),
    },
    {
      key: 'resume',
      title: 'Resume',
      href: getHRLinkPath('/resume'),
    },
    {
      key: 'jobs',
      title: 'Jobs',
      href: getHRLinkPath('/jobs'),
    },
    {
      key: 'company',
      title: 'Company',
      href: getHRLinkPath('/company'),
    },
  ];

  useEffect(() => {
    const getModuleName: string | undefined = serviceRegistry.getModuleName();

    if (getModuleName !== 'hrlink') {
      setHRBoxPanel(true);
    }
  }, [location.pathname]);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
  };

  useEffect(() => {
    const path = location.pathname;

    if (path.includes('dashboard')) setActiveTab('dashboard');
    else if (path.includes('resume')) setActiveTab('resume');
    else if (path.includes('jobs')) setActiveTab('jobs');
    else if (path.includes('company')) setActiveTab('company');
    else setActiveTab('dashboard');
  }, [location.pathname]);

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
      <button className="flex justify-center items-center w-[100px] cursor-pointer" onClick={() => navigate('/')}>
        {HRBoxPanel ? <Logo /> : <LogoHRLink />}
      </button>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2">
            {HRBoxPanel ? (
              <>
                <div>
                  <span className="text-secondary-1000 text-2xl font-semibold leading-normal">
                    {location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  <ElementEqual className="text-neutral-400 dark:text-white" size="18" variant="Bold" />
                  <AppBreadcrumb pages={currentPages} />
                </div>
              </>
            ) : (
              <AppTabs
                fullWidth
                classNames={{
                  tabList: 'gap-4',
                  tabContent:
                    'group-data-[selected=true]:text-secondary-400 group-data-[selected=true]:font-bold text-sm',
                  cursor: 'bg-secondary-400 h-[2px]',
                }}
                color="secondary"
                radius="md"
                selectedKey={activeTab}
                size="md"
                tabs={pageTabs}
                variant="underlined"
                onTabChange={handleTabChange}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <AppButton
                props={{
                  color: HRBoxPanel ? 'primary' : 'default',
                  variant: HRBoxPanel ? 'bordered' : 'solid',
                  size: 'xs',
                  radius: 'md',
                  content: <Play size="24" />,
                }}
              />
              <AppButton
                props={{
                  color: HRBoxPanel ? 'primary' : 'default',
                  variant: HRBoxPanel ? 'bordered' : 'solid',
                  size: 'md',
                  radius: 'md',
                  content: t('ed_tour'),
                }}
              />
              <AppButton
                props={{
                  color: HRBoxPanel ? 'primary' : 'default',
                  variant: HRBoxPanel ? 'bordered' : 'solid',
                  radius: 'md',
                  size: 'md',
                  content: t('upgrade'),
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'light',
                  color: 'default',
                  radius: 'sm',
                  size: 'xs',
                  onPress: () => toggleTheme(),
                  content: <Moon size="20" />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'light',
                  color: 'default',
                  radius: 'md',
                  size: 'xs',
                  content: <Notification size="20" />,
                }}
              />
              <AppButton
                props={{
                  isIconOnly: true,
                  variant: 'light',
                  color: 'default',
                  radius: 'md',
                  size: 'xs',
                  content: <SmsNotification size="20" />,
                }}
              />
              {HRBoxPanel && (
                <AppButton
                  props={{
                    isIconOnly: true,
                    variant: 'light',
                    color: 'default',
                    radius: 'md',
                    size: 'xs',
                    content: <HourGlass size="20" />,
                  }}
                />
              )}
            </div>
            <div>
              <Avatar radius="sm" src="" />
            </div>
          </div>
        </div>
        {HRBoxPanel && <Divider className="bg-primary-400" />}
      </div>
    </div>
  );
};

export default AppHeader;
