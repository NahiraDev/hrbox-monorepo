import {
  ArrowSwapHorizontal,
  CardReceive,
  Chart2,
  Crown,
  DirectInbox,
  Edit2,
  ElementEqual,
  Health,
  Hierarchy3,
  MobileProgramming,
  NoteFavorite,
  Personalcard,
  PresentionChart,
  ProfileAdd,
  Setting2,
  Setting5,
  SmsTracking,
  StatusUp,
  Notification,
  Message,
} from 'iconsax-reactjs';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { AppDocItem } from '@hrbox/uikit/sections/AppDocItems';
import { useAppSelector } from '@hrbox/core/redux/hooks';
import { Panel } from '@hrbox/core/config/theme';

const PRIMARY_MENU_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: ElementEqual,
    path: '/hrbox/dashboard',
    outlined: false,
  },
  {
    id: 'cartable',
    label: 'Cartable',
    icon: DirectInbox,
    path: '/hrbox/cartable',
    outlined: false,
  },
  {
    id: 'report-maker',
    label: 'Report Maker',
    icon: Health,
    path: '/hrbox/report-maker',
    outlined: false,
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
    icon: ProfileAdd,
    path: '/hrbox/recruitment',
    outlined: false,
  },
  {
    id: 'payroll',
    label: 'Payroll',
    icon: CardReceive,
    path: '/hrbox/payroll',
    outlined: false,
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: ArrowSwapHorizontal,
    path: '/hrbox/attendance',
    outlined: false,
  },
  {
    id: 'process-maker',
    label: 'Process Maker',
    icon: Hierarchy3,
    path: '/hrbox/process-maker',
    outlined: false,
  },
  {
    id: 'basic-info',
    label: 'Basic Info',
    icon: Personalcard,
    path: '/hrbox/basic-info',
    outlined: false,
  },
  {
    id: 'job-grading',
    label: 'Job Grading',
    icon: Crown,
    path: '/hrbox/job-grading',
    outlined: false,
  },
  {
    id: 'settings',
    label: 'All Settings',
    icon: Setting5,
    path: '/hrbox/settings',
    outlined: false,
  },
  {
    id: 'form-maker',
    label: 'Form Maker',
    icon: NoteFavorite,
    path: '/hrbox/form-maker',
    outlined: false,
  },
  {
    id: 'project-management',
    label: 'Projects',
    icon: MobileProgramming,
    path: '/hrbox/projects',
    outlined: false,
  },
  {
    id: 'contract-maker',
    label: 'Contracts',
    icon: Edit2,
    path: '/hrbox/contracts',
    outlined: false,
  },
  {
    id: 'performance',
    label: 'Performance',
    icon: StatusUp,
    path: '/hrbox/performance',
    outlined: false,
  },
  {
    id: 'messenger',
    label: 'Messenger',
    icon: SmsTracking,
    path: '/hrbox/messenger',
    outlined: false,
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: PresentionChart,
    path: '/hrbox/reports',
    outlined: false,
  },
];

/**
 * منوی اضافی (بعد از divider)
 */
const ADDITIONAL_ITEMS = [
  {
    id: 'general-settings',
    label: 'Settings',
    icon: Setting2,
    path: '/hrbox/general-settings',
    outlined: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Notification,
    path: '/hrbox/notifications',
    outlined: true,
  },
  {
    id: 'messages',
    label: 'Messages',
    icon: Message,
    path: '/hrbox/messages',
    outlined: true,
  },
];

/**
 * AppDocs - Dock منوی پایین صفحه
 * فقط برای پنل HRBOX نمایش داده می‌شود
 */
export const AppDocs = () => {
  const currentPanel = useAppSelector((state) => state.auth.currentPanel);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const windowHeight = window.innerHeight;
    const mouseY = event.clientY;
    const threshold = 30; // pixels from bottom

    if (!isVisible && mouseY >= windowHeight - threshold) {
      setIsVisible(true);
    } else if (isVisible && mouseY <= windowHeight - 180) {
      setIsVisible(false);
    }
  }, [isVisible]);

  /**
   * تشخیص scroll
   */
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove]);

  /**
   * اضافه کردن padding به صفحه
   */
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.paddingBottom = '160px';
    } else {
      document.documentElement.style.paddingBottom = '0';
    }

    return () => {
      document.documentElement.style.paddingBottom = '0';
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        // 📂 Dock باز
        <motion.div
          key="dock-open"
          className="fixed bottom-3 left-1/2 z-50 -translate-x-1/2 w-full max-w-screen-lg px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Container */}
          <motion.div
            className="
              flex items-center gap-2 bg-panel-surface dark:bg-neutral-800
              rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700
              p-3 backdrop-blur-xl
            "
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
              {PRIMARY_MENU_ITEMS.map((item, index) => (
                <AppDocItem
                  key={item.id}
                  icon={item.icon}
                  module={item.label}
                  path={item.path}
                  outlined={item.outlined}
                  index={index}
                />
              ))}

              {/* Divider */}
              <motion.div
                className="h-12 w-px bg-gradient-to-b from-neutral-300 to-neutral-200 dark:from-neutral-600 dark:to-neutral-700 mx-1"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ delay: 0.3 }}
              />

              {/* Additional Items */}
              {ADDITIONAL_ITEMS.map((item, index) => (
                <AppDocItem
                  key={item.id}
                  icon={item.icon}
                  module={item.label}
                  path={item.path}
                  outlined={item.outlined}
                  index={PRIMARY_MENU_ITEMS.length + 1 + index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="dock-closed"
          className="fixed bottom-2 left-1/2 z-50 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="
              bg-neutral-300/40 dark:bg-neutral-700/40 backdrop-blur-md
              rounded-full px-6 h-2 hover:bg-neutral-300/60 dark:hover:bg-neutral-700/60
              transition-all shadow-md border border-neutral-200/50 dark:border-neutral-600/50
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Show dock menu"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};