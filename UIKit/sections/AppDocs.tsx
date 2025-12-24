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
} from "iconsax-reactjs";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AppDocItem from "./AppDocItems";

const MenuItems = [
  { module: "Home", icon: ElementEqual, outline: false },
  { module: "Cartable", icon: DirectInbox, outline: false },
  { module: "Report Maker", icon: Health, outline: false },
  { module: "Recruitment", icon: ProfileAdd, outline: false },
  { module: "Payroll", icon: CardReceive, outline: false },
  { module: "Attendance", icon: ArrowSwapHorizontal, outline: false },
  { module: "Process Maker", icon: Hierarchy3, outline: false },
  { module: "basic-info", icon: Personalcard, outline: false },
  { module: "Job Grading", icon: Crown, outline: false },
  { module: "All Indicator", icon: Setting5, outline: false },
  { module: "Form Maker", icon: NoteFavorite, outline: false },
  { module: "Project Management", icon: MobileProgramming, outline: false },
  { module: "Contract Maker", icon: Edit2, outline: false },
  { module: "Performance", icon: StatusUp, outline: false },
  { module: "Messenger", icon: SmsTracking, outline: false },
  { module: "Dashboard", icon: Chart2, outline: false },
  { module: "All Report", icon: PresentionChart, outline: false },
];

export const AppDocs: React.FC = () => {
  const [closeDocs, setCloseDocs] = useState<boolean>(false);

  return (
    <AnimatePresence mode="wait">
      {closeDocs ? (
        <div
          className="flex justify-center z-50 h-36 relative bg-white w-fit! rounded-xl shadow-lg "
          style={{ zoom: 0.8 }}
        >
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
              <div className="bg-linear-to-b mx-2 w-px h-8" />

              {/* Additional Items */}
              <AppDocItem
                icon={Setting2}
                module="General Indicator"
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
          className="flex items-center justify-center py-2"
          exit={{ opacity: 0, y: -50 }}
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.button
            className="bg-gray-300 dark:bg-gray-700/80 backdrop-blur-sm rounded-full w-32 h-1.5 hover:bg-gray-400/80 dark:hover:bg-gray-600/80 transition-colors shadow-sm"
            onClick={() => setCloseDocs(true)}
            whileHover={{ scale: 1.05, width: 140 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
