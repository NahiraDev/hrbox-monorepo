import {
  ArrowSwapHorizontal,
  CardReceive,
  Chart2,
  Crown,
  DirectInbox,
  Edit2,
  ElementEqual,
  HashtagSquare,
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
} from 'iconsax-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { AppDocItem } from 'shared/sections/index';

const MenuItems = [
  { module: 'Home', icon: ElementEqual, outline: false },
  { module: 'Cartable', icon: DirectInbox, outline: false },
  { module: 'Report Maker', icon: Health, outline: false },
  { module: 'Recruitment', icon: ProfileAdd, outline: false },
  { module: 'Payroll', icon: CardReceive, outline: false },
  { module: 'Attendance', icon: ArrowSwapHorizontal, outline: false },
  { module: 'Process Maker', icon: Hierarchy3, outline: false },
  { module: 'basic-info', icon: Personalcard, outline: false },
  { module: 'Job Grading', icon: Crown, outline: false },
  { module: 'All Setting', icon: Setting5, outline: false },
  { module: 'Form Maker', icon: NoteFavorite, outline: false },
  { module: 'Project Management', icon: MobileProgramming, outline: false },
  { module: 'Contract Maker', icon: Edit2, outline: false },
  { module: 'Performance', icon: StatusUp, outline: false },
  { module: 'Messenger', icon: SmsTracking, outline: false },
  { module: 'Dashboard', icon: Chart2, outline: false },
  { module: 'All Report', icon: PresentionChart, outline: false },
];

export const AppDocs: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowHeight = window.innerHeight;
      const mouseY = event.clientY;
      // اگر لیست بسته است، فقط وقتی ماوس به لبه پایینی (2px آخر) می‌رسد، باز شود
      // اگر لیست باز است، تا زمانی که ماوس در محدوده 149px (ارتفاع لیست + فاصله) باشد، باز بماند
      if (!isVisible && mouseY >= windowHeight - 2) {
        setIsVisible(true);
      } else if (isVisible && mouseY <= windowHeight - 149) {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  // اعمال padding-bottom به body یا والد وقتی لیست باز است
  useEffect(() => {
    const container = document.body; // یا document.querySelector('.page-container') اگر والد خاصی دارید
    if (isVisible) {
      container.style.paddingBottom = '149px'; // 144px (h-36) + 5px (bottom)
    } else {
      container.style.paddingBottom = '0';
    }
    return () => {
      container.style.paddingBottom = '0'; // پاکسازی در unmount
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <div className="w-full flex justify-center z-50 h-36 absolute" style={{ bottom: '5px' }}>
          <motion.div
            key="dock-open"
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-surface rounded-xl w-fit shadow-light-tight-2 px-8 py-2"
            exit={{ opacity: 0, y: 100 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 h-full overflow-x-auto scrollbar-hide">
              {MenuItems.map((item, index) => (
                <AppDocItem
                  key={item.module}
                  icon={item.icon}
                  module={item.module}
                  outlined={item.outline}
                  mouseX={null}
                  index={index}
                />
              ))}

              {/* Divider */}
              <div className="bg-gradient-to-b mx-2 w-px h-8" />

              {/* Additional Items */}
              <AppDocItem
                icon={Setting2}
                module="General Setting"
                outlined={true}
                mouseX={null}
                index={MenuItems.length}
              />
              <AppDocItem
                icon={HashtagSquare}
                module="Dashboard"
                outlined={true}
                mouseX={null}
                index={MenuItems.length + 1}
              />
              <AppDocItem
                icon={SmsTracking}
                module="Messages"
                outlined={true}
                mouseX={null}
                index={MenuItems.length + 2}
              />
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.div
          key="dock-closed"
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center py-2 absolute bottom-1 w-full"
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.button
            className="bg-gray-300/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full w-32 h-1.5 hover:bg-gray-400/80 dark:hover:bg-gray-600/80 transition-colors shadow-sm"
            onClick={() => setIsVisible(true)}
            whileHover={{ scale: 1.05, width: 140 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
