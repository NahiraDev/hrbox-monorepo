import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight2, ArrowLeft2, Setting2, Global, LogoutCurve, } from "iconsax-react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { setLanguage, setLocalLanguage } from "@hrbox/shared-templates";
export const AppSideBar = ({ menu }) => {
    const [fullWidth, setFullWidth] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const currentLang = useSelector((state) => state.language.lang);
    const bottomMenu = [
        {
            icon: _jsx(Setting2, { size: "24" }),
            name: t("generalSetting"),
            route: "/setting",
        },
        {
            icon: _jsx(Global, { size: "24" }),
            name: currentLang === "fa" ? t("persian") : t("english"),
            route: "/",
        },
        { icon: _jsx(LogoutCurve, { size: "24" }), name: "Log out", route: "logout" },
    ];
    const handleLogout = () => {
        console.log("User logged out");
    };
    const handleNavigatePage = (item) => {
        setActiveTab(item.name);
        if (item.route) {
            navigate(item.route);
        }
    };
    const toggleLanguage = (language, local) => {
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
    return (_jsxs("div", { className: `flex relative rounded-lg py-6 px-4 bg-white dark:bg-info-1000 shadow-shadow-light-tight/2 transition-all ${!fullWidth ? "w-[100px]" : "w-[180px]"}`, children: [_jsx("button", { className: "dark:bg-info-1000 bg-white cursor-pointer flex justify-center items-center absolute top-[50px] right-[-10px] w-6 h-6 rounded-full shadow-[0px_1px_2px_rgba(0,0,0,0.20)]", onClick: () => setFullWidth(!fullWidth), children: fullWidth ? (_jsx(ArrowLeft2, { className: "cursor-pointer text-info-1000 dark:text-white", size: "12" })) : (_jsx(ArrowRight2, { className: "cursor-pointer text-info-1000 dark:text-white", size: "12" })) }), _jsxs("div", { className: "flex flex-col items-center w-full", children: [_jsx("div", { className: `flex flex-col h-full w-full pb-3 gap-3 ${fullWidth ? "items-start pl-1" : "items-center"}`, children: menu.map((item) => (_jsx("div", { className: "border-transparent", children: _jsxs(Button, { isIconOnly: true, className: "flex justify-center items-center !gap-1 !h-fit !w-full p-3 rounded-[0px] bg-transparent transition-all duration-200", variant: "flat", onPress: () => handleNavigatePage(item), children: [_jsx("div", { className: `cursor-pointer ${activeTab === item.name
                                            ? "text-tertiar-400"
                                            : "text-secondary-1000 dark:text-white"}`, children: item?.icon }), fullWidth && (_jsx("span", { className: `cursor-pointer text-[12px] ${activeTab === item.name
                                            ? "text-primary dark:text-gold"
                                            : "text-secondary-1000 dark:text-white"}`, children: item?.name }))] }) }, item.name))) }), _jsx("div", { className: `flex flex-col ${fullWidth ? "items-start pl-1" : ""} gap-[10px] pt-3 border-t-1 border-secondary-1000 dark:border-white w-full`, children: bottomMenu.map((item) => (_jsx("div", { className: `${activeTab === item.name ? "border-b border-tertiar-400 dark:border-white" : "border-transparent"}`, children: _jsxs(Button, { isIconOnly: true, className: "flex justify-center items-center !gap-2 p-3 rounded-[0px] !h-fit !w-full bg-transparent transition-all duration-200", onPress: () => {
                                    if (item.name === t("english") ||
                                        item.name === t("persian")) {
                                        handleLanguageChange();
                                    }
                                    else if (item.name === "Log out") {
                                        handleLogout();
                                    }
                                    else {
                                        handleNavigatePage(item);
                                    }
                                }, children: [_jsx("div", { className: `cursor-pointer ${activeTab === item.name
                                            ? "text-primary-400 dark:text-white"
                                            : "text-secondary-1000 dark:text-white"}`, children: item?.icon }), fullWidth && (_jsx("span", { className: `cursor-pointer text-xs font-normal ${activeTab === item.name
                                            ? "text-primary-400 dark:text-white"
                                            : "text-secondary-1000 dark:text-white"}`, children: item?.name }))] }) }, item.name))) })] })] }));
};
