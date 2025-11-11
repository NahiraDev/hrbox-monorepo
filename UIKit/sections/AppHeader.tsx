import { Moon, Sun1, Notification, SmsNotification } from "iconsax-reactjs";
import { Avatar, Divider, Badge } from "@heroui/react";
import { useMemo } from "react";
import { useMatches, useNavigate } from "@tanstack/react-router";

import { AppButton } from "@hrbox/uikit/components";
import { AppBreadcrumb } from "@hrbox/uikit/sections";
import { useTheme } from "@hrbox/core/hooks/useTheme";
import { useAuth } from "@hrbox/core/hooks/useAuth";
import { RoleSwitcher } from "@hrbox/core/components/RoleSwitcher";
import { DynamicLogo } from "@hrbox/core/components/DynamicLogo";

export const AppHeader = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { isDark, toggleMode } = useTheme();
  const { currentPanel, user } = useAuth();

  const currentRoute = matches[matches.length - 1];
  const routeContext = currentRoute?.context as any;
  const pageTitle = routeContext?.pageTitle || "Dashboard";

  const breadcrumbPages = useMemo(() => {
    const pathname = currentRoute?.pathname || "/";
    const segments = pathname.split("/").filter(Boolean);

    return ["Home", ...segments.map(seg =>
      seg.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
    )];
  }, [currentRoute?.pathname]);


  return (
    <div className="flex items-center justify-between px-6 py-4 gap-6">
      {/* Logo */}
      <div className="flex justify-center items-center min-w-fit">
        <DynamicLogo className="h-8" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full gap-2">
        {/* Title & Actions Row */}
        <div className="flex items-center justify-between w-full">
          {/* Left: Title & Breadcrumb */}
          <div className="flex flex-col gap-2 flex-1">
            {/* Page Title */}
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">
              {pageTitle}
            </h1>
            {/* Breadcrumb */}
            <AppBreadcrumb pages={breadcrumbPages} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <AppButton
              variant="light"
              isIconOnly={true}
              content={isDark ? (
                <Sun1 size="20" className="text-secondary-900 dark:text-white" />
              ) : (
                <Moon size="20" className="text-secondary-900 dark:text-white" />
              )}
              onPress={toggleMode}
            />

            {/* Notifications */}
            <Badge content="5" color="danger" size="sm" placement="top-right">
              <AppButton
                isIconOnly={true}
                variant="light"
                radius="md"
                size="md"
                onPress={() => navigate({ to: "/notifications" })}
                content={<Notification size="20" className="text-secondary-900 dark:text-white" />}
              />
            </Badge>

            {/* Messages */}
            <Badge content="3" color="primary" size="sm" placement="top-right">
              <AppButton
                onPress={() => navigate({ to: "/messages" })}
                content={<SmsNotification size="20" className="text-secondary-900 dark:text-white" />}
                variant="light"
                size="sm"
                isIconOnly={true}
              />
            </Badge>

            {/* Divider */}
            <Divider orientation="vertical" className="h-6" />

            {/* Role Switcher */}
            <RoleSwitcher />

            {/* User Avatar */}
            <button
              onClick={() => navigate({ to: "/profile" })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              aria-label="User profile"
            >
              <Avatar
                radius="sm"
                size="sm"
                src={user?.avatar || ""}
                name={user?.name || "User"}
                className="bg-primary-100 dark:bg-primary-900"
                isBordered
                color="primary"
              />
              {user?.name && (
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-medium text-secondary-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {user.email}
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};