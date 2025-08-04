import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { CardReceive, DirectboxReceive, ElementEqual, Health, ProfileAdd, ArrowSwapHorizontal, TaskSquare, ClipboardTick, Setting2, HashtagSquare, SmsTracking, } from "iconsax-react";
import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocItem } from "./AppDocItems";
export const AppDocs = () => {
    const { t } = useTranslation();
    const [closeDocs, setCloseDocs] = useState(true);
    return (_jsx(_Fragment, { children: _jsx(AnimatePresence, { children: closeDocs ? (_jsx("div", { className: "w-full flex justify-center z-50", children: _jsx(motion.div, { animate: { opacity: 1, y: 0 }, className: "flex items-center bg-surface dark:bg-surface-150 rounded-6 w-fit h-[128px]", exit: { opacity: 0, y: 100 }, initial: { opacity: 0, y: 100 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "flex items-center bg-surface dark:bg-surface-150 rounded-6 w-fit h-[128px]", children: _jsxs("div", { className: "py-2 px-8 flex flex-col items-center gap-4", children: [_jsx("button", { className: "bg-netural-150 rounded-4 w-24 h-2", onClick: () => setCloseDocs(false) }), _jsxs("div", { className: "flex items-center gap-10 h-full", children: [_jsx(DocItem, { props: {
                                                to: "/dashboard",
                                                icon: ElementEqual,
                                                title: t("dashboard"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/workspace",
                                                icon: DirectboxReceive,
                                                title: t("workspace"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/performance",
                                                icon: Health,
                                                title: t("performance"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/recruitment",
                                                icon: ProfileAdd,
                                                title: t("recruitment"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/payroll",
                                                icon: CardReceive,
                                                title: t("payroll"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/attendance",
                                                icon: ArrowSwapHorizontal,
                                                title: t("attendance"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/basic-info",
                                                icon: ClipboardTick,
                                                title: t("BasicInfo"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/facilities",
                                                icon: TaskSquare,
                                                title: t("facilities"),
                                                outlined: false,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/project-management",
                                                icon: ClipboardTick,
                                                title: t("Project.M"),
                                                outlined: false,
                                                isActive: true,
                                            } }), _jsx(Divider, { className: "h-16 bg-secondary-300 dark:bg-primary-150", orientation: "vertical" }), _jsx(DocItem, { props: {
                                                to: "/setting",
                                                icon: Setting2,
                                                title: t("generalSetting"),
                                                outlined: true,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/dashboard",
                                                icon: HashtagSquare,
                                                title: t("dashboard"),
                                                outlined: true,
                                                isActive: false,
                                            } }), _jsx(DocItem, { props: {
                                                to: "/dashboard",
                                                icon: SmsTracking,
                                                title: t("dashboard"),
                                                outlined: true,
                                                isActive: false,
                                            } })] })] }) }) }, "open") })) : (_jsx(motion.div, { animate: { opacity: 1, y: 0 }, className: "flex items-center justify-center", exit: { opacity: 0, y: 100 }, initial: { opacity: 0, y: 100 }, transition: { duration: 0.3 }, children: _jsx("div", { className: "my-2 mx-4", children: _jsx("button", { className: "bg-netural-150 rounded-4 w-48 h-3", onClick: () => setCloseDocs(true) }) }) }, "closed")) }) }));
};
