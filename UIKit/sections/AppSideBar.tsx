import { ArrowLeft2, ArrowRight2, Global, LogoutCurve, Setting2 } from "iconsax-reactjs";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "@hrbox/core/hooks/useLanguage";
import { useAuth } from "@hrbox/core/hooks/useAuth";
import { useLogout } from "@hrbox/core/hooks/useLogout";
import { useModuleAccess } from "@hrbox/core/hooks/useModuleAccess";

interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: MenuItem[];
}

export const AppSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const matchRoute = useMatchRoute();
  const { lang, toggleLanguage } = useLanguage();
  const { currentPanel } = useAuth();
  const { handleLogout } = useLogout();
  const { getModuleMenu } = useModuleAccess();

  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = useMemo(() => {
    return getModuleMenu("attendance");
  }, [currentPanel, getModuleMenu]);

  const isActiveRoute = (path: string) => {
    return !!matchRoute({ to: path });
  };

  const bottomMenu = useMemo(
    () => [
      {
        id: "settings",
        icon: <Setting2 size="20" />,
        label: t("generalSetting", "Settings"),
        action: () => navigate({ to: "/settings" })
      },
      {
        id: "language",
        icon: <Global size="20" />,
        label: lang === "fa" ? t("persian", "فارسی") : t("english", "English"),
        action: toggleLanguage
      },
      {
        id: "logout",
        icon: <LogoutCurve size="20" />,
        label: t("logout", "Logout"),
        action: handleLogout
      }
    ],
    [lang, t, navigate, toggleLanguage, handleLogout]
  );

  const handleNavigate = (item: MenuItem) => {
    if (item.path) {
      navigate({ to: item.path });
    }
  };


  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 220 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-full rounded-lg py-4 px-4 bg-white dark:bg-surface-200 shadow-theme-md dark:shadow-theme-lg"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-[50px] -right-3 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white text-secondary shadow-theme-sm hover:scale-110 transition-transform"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ArrowLeft2 size="12" /> : <ArrowRight2 size="12" />}
      </button>

      <div className="flex flex-col items-center justify-between w-full h-full">
        <nav
          className={`flex flex-col w-full pb-3 gap-2 ${
            isExpanded ? "items-start" : "items-center"
          }`}
          aria-label="Main navigation"
        >
          <AnimatePresence mode="wait">
            {menuItems.map((item: MenuItem) => {
              const isActive = isActiveRoute(item.path);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full"
                >
                  <button
                    onClick={() => handleNavigate(item)}
                    className={`
                      relative flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all
                      ${
                      isActive
                        ? "bg-transparent"
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }
                      ${!isExpanded && "justify-center"}
                    `}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={`shrink-0 ${isActive ? "text-primary" : "text-secondary-1000 dark:text-neutral-400"}`}
                    >
                      {item.icon}
                    </span>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`text-sm font-normal whitespace-nowrap overflow-hidden ${
                            isActive
                              ? "text-primary"
                              : "text-secondary-1000 dark:text-neutral-400"
                          }`}
                        >
                          <div>
                            {item.label}
                          </div>
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 w-full left-0 h-0.5 bg-primary text-primary"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </nav>

        <div
          className={`flex flex-col w-full gap-2 pt-3 border-t border-neutral-200 dark:border-neutral-700 ${
            isExpanded ? "items-start" : "items-center"
          }`}
        >
          {bottomMenu.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`
                flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all
                hover:bg-neutral-100 dark:hover:bg-neutral-800 text-secondary-1000 dark:text-neutral-400
                ${!isExpanded && "justify-center"}
              `}
              aria-label={item.label}
            >
              <span className="flex-shrink-0">{item.icon}</span>

              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium whitespace-nowrap overflow-hidden text-secondary-1000"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};