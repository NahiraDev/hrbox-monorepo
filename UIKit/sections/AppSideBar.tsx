import { ArrowRight2, ArrowLeft2, Setting2, Global, LogoutCurve } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { serviceRegistry } from 'core/helpers';

import { AppButton } from 'shared/components';
import { useAppSelector, useAppDispatch, setLanguage, setLocalLanguage } from 'core/redux';

export const AppSideBar = () => {
  const { t } = useTranslation();
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | undefined>('Home');
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state:any) => state.language.lang);
  const location = useLocation();
  const bottomMenu = [
    {
      icon: <Setting2 size="24" />,
      name: t('generalSetting'),
      route: '/setting',
    },
    {
      icon: <Global size="24" />,
      name: currentLang === 'fa' ? t('persian') : t('english'),
      route: '/',
    },
    { icon: <LogoutCurve size="24" />, name: 'Log out', route: 'logout' },
  ];

  const handleLogout = () => {
    alert('User logged out');
  };

  const handleNavigatePage = (item: any) => {
    setActiveTab(item.label);
    if (item.route) {
      navigate(item.route);
    }
  };

  const toggleLanguage = (language: string, local: string) => {
    dispatch(setLanguage(language));
    dispatch(setLocalLanguage(local));
    i18n.changeLanguage(language);
  };

  const handleLanguageChange = () => {
    const newLang = currentLang === 'en' ? 'fa' : 'en';
    const newLocalLang = currentLang === 'en' ? 'fa-IR-u-ca-persian' : 'en-US';

    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    toggleLanguage(newLang, newLocalLang);
  };

  useEffect(() => {
    const getModuleName: string | undefined = serviceRegistry.getModuleName();
    const activeMenu = serviceRegistry.getActiveMenu(getModuleName ?? '');

    setMenuItems(activeMenu);
  }, [location.pathname]);

  useEffect(() => {
    const activeItem = menuItems.find(item => item.path === location.pathname);
    if (activeItem) {
      setActiveTab(activeItem.label);
    }
  }, [location.pathname, menuItems]);

  useEffect(() => {
    const lang = localStorage.getItem('lang') ?? 'en';

    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, []);

  return (
    <div
      className={`flex relative rounded-lg py-4 px-4 bg-white shadow-theme-md dark:shadow-dark-tight-2 transition-all ${!fullWidth ? 'w-[100px]' : 'w-[180px]'}`}
    >
      <AppButton
        props={{
          className: 'absolute top-[50px] right-[-10px] shadow-theme-sm bg-white',
          color: 'default',
          variant: 'solid',
          size: 'xs',
          radius: 'full',
          onPress: () => setFullWidth(!fullWidth),
          content: (
            <div>
              {fullWidth ? (
                <ArrowLeft2 className="cursor-pointer text-info-1000" size="12" />
              ) : (
                <ArrowRight2 className="cursor-pointer text-info-1000" size="12" />
              )}
            </div>
          ),
        }}
      />

      <div className="flex flex-col items-center justify-between w-full">
        <div className={`flex flex-col w-full pb-3 gap-3 ${fullWidth ? 'items-start pl-1' : 'items-center'}`}>
          {menuItems.map((item: any) => (
            <div key={item.label} className="border-transparent">
              <AppButton
                props={{
                  className: 'flex justify-center items-center !gap-1 p-3 transition-all border-b-1 group-hover border-transparent duration-200 hover:text-primary-400 hover:border-primary-400`',
                  isIconOnly: true,
                  color: 'default',
                  size: 'xs',
                  variant:'light',
                  radius: 'none',
                  disableRipple: true,
                  onPress: () => handleNavigatePage({ name: item.label, route: item.path }),
                  content: (
                    <>
                      <div
                        className={`cursor-pointer${
                          activeTab === item.label ? '!text-primary-400' : 'text-secondary-1000 '
                        }`}
                      >
                        {item?.icon}
                      </div>
                      {fullWidth && (
                        <span
                          className={`cursor-pointer text-[12px] ${
                            activeTab === item.label ? '!text-primary-400' : 'text-secondary-1000'
                          }`}
                        >
                          {item?.label}
                        </span>
                      )}
                    </>
                  ),
                }}
              />
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col ${fullWidth ? 'items-start pl-1' : ''} gap-[10px] pt-3 border-t-1 border-secondary-1000 w-full`}
        >
          {bottomMenu.map((item) => (
            <div
              key={item.name}
              className={`${
                activeTab === item.name ? 'border-b border-tertiar-400' : 'border-transparent'
              }`}
            >
              <AppButton
                props={{
                  className:
                    'flex justify-center items-center !gap-2 p-3 !h-fit !w-full bg-transparent transition-all duration-200',
                  isIconOnly: true,
                  color: 'default',
                  size: 'md',
                  variant: 'light',
                  radius: 'none',
                  onPress: () => {
                    if (item.name === t('english') || item.name === t('persian')) {
                      handleLanguageChange();
                    } else if (item.name === 'Log out') {
                      handleLogout();
                    } else {
                      handleNavigatePage(item);
                    }
                  },
                  content: (
                    <>
                      <div
                        className={`cursor-pointer ${
                          activeTab === item.name ? 'text-tertiar-400' : 'text-secondary-1000'
                        }`}
                      >
                        {item?.icon}
                      </div>
                      {fullWidth && (
                        <span
                          className={`cursor-pointer text-[12px] ${
                            activeTab === item.name ? 'text-primary dark:text-gold' : 'text-secondary-1000'
                          }`}
                        >
                          {item?.name}
                        </span>
                      )}
                    </>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
