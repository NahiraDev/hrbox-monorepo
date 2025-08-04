import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ElementEqual, Moon, Notification, Play, SmsNotification, } from "iconsax-react";
import { Button, Avatar, Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDarkMode } from "@hrbox/shared-templates";
import { AvatarUser } from "@hrbox/shared-templates";
import { AppBreadcrumb } from "./AppBreadCrumb";
import { HourGlass } from "@hrbox/shared-templates";
import { Logo } from "@hrbox/shared-templates";
export const AppHeader = () => {
    const { toggleDarkMode, darkMode } = useDarkMode();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPages, setCurrentPages] = useState([]);
    useEffect(() => {
        const pathSegments = location.pathname
            .split("/")
            .filter((segment) => segment);
        setCurrentPages(["Home", ...pathSegments]);
    }, [location]);
    return (_jsxs("div", { className: "flex items-center justify-between pb-8 pt-4 gap-10", children: [_jsx("button", { className: "flex justify-center items-center w-[80px]", onClick: () => navigate("/"), children: _jsx(Logo, {}) }), _jsxs("div", { className: "flex flex-col w-full", children: [_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("div", { children: _jsx("span", { className: "text-secondary-1000 dark:text-white text-2xl font-semibold leading-normal", children: location.pathname
                                                .split("/")
                                                .filter(Boolean)
                                                .pop()
                                                ?.replace(/-/g, " ") }) }), _jsxs("div", { className: "flex gap-2 mb-2", children: [_jsx(ElementEqual, { className: "text-netural-400 dark:text-netural-600", size: "18", variant: "Bold" }), _jsx(AppBreadcrumb, { pages: currentPages })] })] }), _jsxs("div", { className: "flex gap-2 mb-3", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { isIconOnly: true, className: "bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200", variant: "light", children: _jsx(Play, { className: "text-secondary-1000 dark:text-white", size: "24" }) }), _jsx(Button, { className: "bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200", variant: "light", children: _jsx("span", { className: "text-secondary-1000 dark:text-white font-semibold", children: t("ed_tour") }) }), _jsx(Button, { className: "bg-white dark:bg-info-1000 !rounded-4 p-2 border border-primary dark:border-surface-200", variant: "light", children: _jsx("span", { className: "text-secondary-1000 dark:text-white font-semibold", children: t("upgrade") }) })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { isIconOnly: true, variant: "light", onPress: () => toggleDarkMode(), children: _jsx(Moon, { className: "text-secondary-1000 dark:text-white", size: "20", variant: darkMode ? "Bold" : "Outline" }) }), _jsx(Button, { isIconOnly: true, variant: "light", children: _jsx(Notification, { className: "text-secondary-1000 dark:text-white", size: "20" }) }), _jsx(Button, { isIconOnly: true, variant: "light", children: _jsx(SmsNotification, { className: "text-secondary-1000 dark:text-white", size: "20" }) }), _jsx(Button, { isIconOnly: true, variant: "light", children: _jsx(HourGlass, { size: "20" }) })] }), _jsx("div", { children: _jsx(Avatar, { radius: "sm", src: AvatarUser }) })] })] }), _jsx(Divider, { className: "bg-primary dark:bg-surface-200" })] })] }));
};
