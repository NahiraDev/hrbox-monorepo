import {
  ArrowRight2,
  ArrowLeft2,
  Setting2,
  Global,
  LogoutCurve,
} from "iconsax-react";
import React, { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import { AppDispatch, RootState } from "@hrbox/shared-templates";
import { setLanguage, setLocalLanguage } from "@hrbox/shared-templates";

export type SideBarItem = {
  icon: React.ReactNode;
  name: string;
  route?: string;
};

type SideBarProps = {
  menu: SideBarItem[];
};

export const AppSideBar = ({ menu }: SideBarProps) => {
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | undefined>("Home");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const currentLang = useSelector((state: RootState) => state.language.lang);
  const bottomMenu = [
    {
      icon: <Setting2 size="24" />,
      name: t("generalSetting"),
      route: "/setting",
    },
    {
      icon: <Global size="24" />,
      name: currentLang === "fa" ? t("persian") : t("english"),
      route: "/",
    },
    { icon: <LogoutCurve size="24" />, name: "Log out", route: "logout" },
  ];
  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleNavigatePage = (item: SideBarItem) => {
    setActiveTab(item.name);
    if (item.route) {
      navigate(item.route);
    }
  };
  const toggleLanguage = (language: string, local: string) => {
    dispatch(setLanguage(language));
    dispatch(setLocalLanguage(local));
    i18n.changeLanguage(language);

    if (currentLang) {
      dispatch(setLanguage(language));
    }
  };

  const handleLanguageChange = () => {
    const newLang = currentLang === "en" ? "fa" : "en";
    const newLocalLang = currentLang === "en" ? "fa-IR-u-ca-persian" : "en-US";

    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
    toggleLanguage(newLang, newLocalLang);
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang") ?? "en";

    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, []);
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menu.find((item) => item.route === currentPath);

    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [location.pathname, menu]);

  return (
    <div
      className={`flex relative rounded-lg py-6 px-4 bg-white dark:bg-info-1000 shadow-shadow-light-tight/2 transition-all ${!fullWidth ? "w-[100px]" : "w-[180px]"}`}
    >
      <button
        className="dark:bg-info-1000 bg-white cursor-pointer flex justify-center items-center absolute top-[50px] right-[-10px] w-6 h-6 rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.20)]"
        onClick={() => setFullWidth(!fullWidth)}
      >
        {fullWidth ? (
          <ArrowLeft2
            className="cursor-pointer text-info-1000 dark:text-white"
            size="12"
          />
        ) : (
          <ArrowRight2
            className="cursor-pointer text-info-1000 dark:text-white"
            size="12"
          />
        )}
      </button>

      <div className="flex flex-col items-center w-full">
        <div
          className={`flex flex-col h-full w-full pb-3 gap-3 ${fullWidth ? "items-start pl-1" : "items-center"}`}
        >
          {menu.map((item) => (
            <div key={item.name} className="border-transparent">
              <Button
                isIconOnly
                className="flex justify-center items-center !gap-1 !h-fit !w-full p-3 rounded-[0px] bg-transparent transition-all duration-200"
                variant="flat"
                onPress={() => handleNavigatePage(item)}
              >
                <div
                  className={`cursor-pointer ${
                    activeTab === item.name
                      ? "text-tertiar-400"
                      : "text-secondary-1000 dark:text-white"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-[12px] ${
                      activeTab === item.name
                        ? "text-primary dark:text-gold"
                        : "text-secondary-1000 dark:text-white"
                    }`}
                  >
                    {item?.name}
                  </span>
                )}
              </Button>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-col ${fullWidth ? "items-start pl-1" : ""} gap-[10px] pt-3 border-t-1 border-secondary-1000 dark:border-white w-full`}
        >
          {bottomMenu.map((item) => (
            <div
              key={item.name}
              className={`${activeTab === item.name ? "border-b border-tertiar-400 dark:border-white" : "border-transparent"}`}
            >
              <Button
                isIconOnly
                className="flex justify-center items-center !gap-2 p-3 rounded-[0px] !h-fit !w-full bg-transparent transition-all duration-200"
                onPress={() => {
                  if (
                    item.name === t("english") ||
                    item.name === t("persian")
                  ) {
                    handleLanguageChange();
                  } else if (item.name === "Log out") {
                    handleLogout();
                  } else {
                    handleNavigatePage(item);
                  }
                }}
              >
                <div
                  className={`cursor-pointer ${
                    activeTab === item.name
                      ? "text-primary-400 dark:text-white"
                      : "text-secondary-1000 dark:text-white"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-xs font-normal ${
                      activeTab === item.name
                        ? "text-primary-400 dark:text-white"
                        : "text-secondary-1000 dark:text-white"
                    }`}
                  >
                    {item?.name}
                  </span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
