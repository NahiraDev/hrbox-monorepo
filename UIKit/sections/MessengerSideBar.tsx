import { useEffect, useState } from "react";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@hrbox/core/redux/slices/languageSlice";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { AppDispatch, RootState } from "@hrbox/core/redux/store";
import { setUser } from "@hrbox/core/redux/slices/userSlice";
import {
  Archive,
  ArrowLeft2,
  ArrowRight2,
  Global,
  Home,
  LogoutCurve,
  People,
  Profile2User,
  Setting2,
  VolumeHigh
} from "iconsax-reactjs";
import { Paths } from "@hrbox/modules/paths";
import { Button } from "@heroui/react";

export const sideBarMenu = [
  {
    icon: <Home size="24" />,
    name: "Home",
    route: Paths.Messenger.Home
  },
  {
    icon: <Profile2User size="24" />,
    name: "Private",
    route: Paths.Messenger.Private
  },
  {
    icon: <People size="24" />,
    name: "Group",
    route: Paths.Messenger.Group
  },
  {
    icon: <VolumeHigh size="24" />,
    name: "Channel",
    route: Paths.Messenger.Channel
  },
  {
    icon: <Archive size="24" />,
    name: "Saved",
    route: Paths.Messenger.SaveMessage
  }
];

export const bottomSideBarMenu = [
  { icon: <Setting2 size="24" />, name: "Setting", route: "/setting" },
  { icon: <Global size="24" />, name: "English", route: "/" },
  { icon: <LogoutCurve size="24" />, name: "Log out", route: "logout" }
];


export const MessengerSideBar = () => {
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | undefined>("Home");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state: RootState) => state.language.lang);

  const currentLang = useSelector(
    (state: { language: { lang: string } }) => state.language.lang
  );

  const toggleLanguage = (language: any) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);

    if (lang) {
      dispatch(setLanguage(language));
    }
  };

  const handleLanguageChange = () => {
    const newLang = currentLang === "en" ? "fa" : "en";
    toggleLanguage(newLang);
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  const handleChangePageMessenger = (item: any) => {
    setActiveTab(item.name);
    if (item.route) {
      dispatch(setUser());
      navigate({ to: item.route });
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = sideBarMenu.find((item) => item.route === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.name);
    }
  }, [location.pathname]);

  return (
    <div
      className={`flex justify-center h-[86vh] ml-6 relative rounded-lg py-6 bg-white dark:bg-info-1000 shadow-shadow-light-tight/2 transition-all ${!fullWidth ? "w-[82px]" : "w-[180px]"}`}
    >
      <div
        onClick={() => setFullWidth(!fullWidth)}
        className="bg-white dark:bg-info-1000 cursor-pointer flex justify-center items-center absolute top-[50px] right-[-10px] w-6 h-6 rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.20)]"
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
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col gap-[48px]">
          {sideBarMenu.map((item) => (
            <div
              key={item.name}
              className={`${activeTab === item.name ? "border-b border-primary-400 dark:border-gold" : "border-transparent"}`}
            >
              <Button
                isIconOnly
                onClick={() => handleChangePageMessenger(item)}
                className="flex justify-center mb-2 items-center !gap-1 !h-fit p-0 rounded-[0px] !w-full bg-transparent transition-all duration-200"
              >
                <div
                  className={`cursor-pointer ${
                    activeTab === item.name
                      ? "text-primary-400 dark:text-gold"
                      : "text-secondary-1000 dark:text-white"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-[12px] ${
                      activeTab === item.name
                        ? "text-primary-400 dark:text-gold"
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
        <div className="flex flex-col gap-[48px] pt-4 border-top-1 border-secondary-1000">
          {bottomSideBarMenu.map((item) => (
            <div
              key={item.name}
              className={`${activeTab === item.name ? "border-b border-primary-400 dark:border-gold" : "border-transparent"}`}
            >
              <Button
                isIconOnly
                onClick={() => {
                  if (item.name === "English") {
                    handleLanguageChange();
                  } else if (item.name === "Log out") {
                    handleLogout();
                  } else {
                    handleChangePageMessenger(item);
                  }
                }}
                className="flex justify-center mb-2 items-center !gap-1 p-0 rounded-[0px] !h-fit !w-full bg-transparent transition-all duration-200"
              >
                <div
                  className={`cursor-pointer ${
                    activeTab === item.name
                      ? "text-primary-400 dark:text-gold"
                      : "text-secondary-1000 dark:text-white"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-xs font-normal ${
                      activeTab === item.name
                        ? "text-primary-400 dark:text-gold"
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