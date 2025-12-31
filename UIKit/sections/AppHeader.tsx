import { Moon, Notification, Play, SmsNotification, Sun1 } from "iconsax-reactjs";
import { Avatar } from "@heroui/react";
import React, { useMemo, useState } from "react";
import { useMatches, useNavigate } from "@tanstack/react-router";
import { AppButton, AppTabs } from "@hrbox/uikit/components";
import { AppBreadcrumb } from "@hrbox/uikit/sections";
import { useTheme } from "@hrbox/core/hooks/useTheme";
import { useAuth } from "@hrbox/core/hooks/useAuth";
import { DynamicLogo } from "@hrbox/core/components/DynamicLogo";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@hrbox/core/redux";

export const AppHeader = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { isDark, toggleMode } = useTheme();
  const { user } = useAuth();
  const { t } = useTranslation();
  const currentRoute = matches[matches.length - 1];
  const routeContext = currentRoute?.context as any;
  const pageTitle = routeContext?.pageTitle || "Dashboard";
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const domainTheme = useAppSelector((state: any) => state.auth.domainTheme);

  const breadcrumbPages = useMemo(() => {
    const pathname = currentRoute?.pathname || "/";
    const segments = pathname.split("/").filter(Boolean);

    return [
      "Home",
      ...segments.map((seg) =>
        seg.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
      )
    ];
  }, [currentRoute?.pathname]);
  const handleTabChange = (key: string | number) => {
    setActiveTab(key as string);
  };
  const getHRLinkPath = (path: string) => {
    const basePath = "/hrlink";

    if (location.pathname.includes(basePath)) {
      return `${basePath}${path}`;
    }

    return path;
  };
  const pageTabs = [
    {
      key: "dashboard",
      title: "Dashboard",
      href: getHRLinkPath("/dashboard")
    },
    {
      key: "resume",
      title: "Resume",
      href: getHRLinkPath("/resume/information    ")
    },
    {
      key: "jobs",
      title: "Jobs",
      href: getHRLinkPath("/job/offers")
    },
    {
      key: "company",
      title: "Company",
      href: getHRLinkPath("/company/all")
    }
  ];
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex justify-center items-center min-w-fit">
        <DynamicLogo className="w-28" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-2 flex-1">
            {domainTheme === "hrbox" ? (
              <>
                <h1 className="text-2xl font-semibold text-black dark:text-white">
                  {pageTitle}
                </h1>
                <AppBreadcrumb pages={breadcrumbPages} />
              </>
            ) : (
              <AppTabs
                fullWidth
                classNames={{
                  tabList: "gap-4",
                  tabContent:
                    "group-data-[selected=true]:text-secondary-400 group-data-[selected=true]:font-bold text-sm",
                  cursor: "bg-secondary-400 h-[2px]"
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
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <AppButton
                color={domainTheme === "hrbox" ? "primary" : "default"}
                variant={domainTheme === "hrbox" ? "bordered" : "solid"}
                size="md"
                radius="lg"
                className="w-fit! h-full! p-2!"
                content={<Play size="24" />}
              />
              <AppButton
                color={domainTheme === "hrbox" ? "primary" : "default"}
                variant={domainTheme === "hrbox" ? "bordered" : "solid"}
                size="md"
                radius="lg"
                className="h-full!"
                content={t("ed_tour")}
              />
              <AppButton
                color={domainTheme === "hrbox" ? "primary" : "default"}
                variant={domainTheme === "hrbox" ? "bordered" : "solid"}
                radius="lg"
                size="md"
                className="h-full!"
                content={t("upgrade")}
              />
            </div>
            <div className="flex items-center gap-3">
              <AppButton
                variant="light"
                isIconOnly={true}
                className="w-full! h-full! p-2.5!"
                content={
                  isDark ? (
                    <Sun1
                      size="20"
                      className="text-secondary-900 dark:text-white"
                    />
                  ) : (
                    <Moon
                      size="20"
                      className="text-secondary-900 dark:text-white"
                    />
                  )
                }
                onPress={toggleMode}
              />

              <AppButton
                isIconOnly={true}
                variant="light"
                radius="md"
                size="xs"
                onPress={() => navigate({ to: "/notifications" })}
                className="w-full! h-full! p-2.5!"
                content={
                  <Notification
                    size="20"
                    className="text-secondary-900 dark:text-white"
                  />
                }
              />
              <AppButton
                onPress={() => navigate({ to: "/messenger" })}
                content={
                  <SmsNotification
                    size="20"
                    className="text-secondary-900 dark:text-white"
                  />
                }
                variant="light"
                size="xs"
                className="w-full! h-full! p-2.5!"
                isIconOnly={true}
              />

              {/* User Avatar */}
              <button
                onClick={() => navigate({ to: "/sso/select-role" })}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label="User profile"
              >
                <Avatar
                  radius="sm"
                  size="sm"
                  src={user?.avatar || ""}
                  name={user?.name || "User"}
                  className="bg-primary"
                  color="primary"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
