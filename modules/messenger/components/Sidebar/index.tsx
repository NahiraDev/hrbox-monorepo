import { ArrowRight2, ArrowLeft2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkMode";
import { sideBarMenu, bottomSideBarMenu } from "./menu";
import { Button } from "@nextui-org/react";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/reducers/language";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBarProps } from "./types";
import { AppDispatch, RootState } from "../../redux/store";
import { setUserProfile } from "../../redux/reducers/profile";

const MessengerSideBar = () => {
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | undefined>("Home");
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = useSelector((state: RootState) => state.language.lang);

  const currentLang = useSelector(
    (state: { language: { lang: string } }) => state.language.lang,
  );

  const toggleLanguage = (language: string) => {
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

  const handleChangePageMessenger = (item: SideBarProps) => {
    setActiveTab(item.name);
    if (item.route) {
      dispatch(setUserProfile({}));
      navigate(item.route);
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
        className="dark:bg-info-1000 bg-white cursor-pointer flex justify-center items-center absolute top-[50px] right-[-10px] w-6 h-6 rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.20)]"
      >
        {fullWidth ? (
          <ArrowLeft2
            className="cursor-pointer dark:text-white text-info-1000"
            size="12"
          />
        ) : (
          <ArrowRight2
            className="cursor-pointer dark:text-white text-info-1000"
            size="12"
          />
        )}
      </div>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col gap-[48px]">
          {sideBarMenu.map((item) => (
            <div
              key={item.name}
              className={`${activeTab === item.name ? (darkMode ? "border-b border-gold" : "border-b border-primary-400") : "border-transparent"}`}
            >
              <Button
                isIconOnly
                onClick={() => handleChangePageMessenger(item)}
                className="flex justify-center mb-2 items-center !gap-1 !h-fit p-0 rounded-[0px] !w-full bg-transparent transition-all duration-200"
              >
                <div
                  className={`cursor-pointer ${
                    activeTab === item.name
                      ? darkMode
                        ? "text-gold"
                        : "text-primary-400"
                      : darkMode
                        ? "text-white"
                        : "text-secondary-1000"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-[12px] ${
                      activeTab === item.name
                        ? darkMode
                          ? "text-gold"
                          : "text-primary-400"
                        : darkMode
                          ? "text-white"
                          : "text-secondary-1000"
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
              className={`${activeTab === item.name ? (darkMode ? "border-b border-gold" : "border-b border-primary-400") : "border-transparent"}`}
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
                      ? darkMode
                        ? "text-gold"
                        : "text-primary-400"
                      : darkMode
                        ? "text-white"
                        : "text-secondary-1000"
                  }`}
                >
                  {item?.icon}
                </div>
                {fullWidth && (
                  <span
                    className={`cursor-pointer text-xs font-normal ${
                      activeTab === item.name
                        ? darkMode
                          ? "text-gold"
                          : "text-primary-400"
                        : darkMode
                          ? "text-white"
                          : "text-secondary-1000"
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

export default MessengerSideBar;
