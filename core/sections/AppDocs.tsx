import {
  CardReceive,
  DirectboxReceive,
  ElementEqual,
  Health,
  ProfileAdd,
  ArrowSwapHorizontal,
  TaskSquare,
  ClipboardTick,
  Setting2,
  HashtagSquare,
  SmsTracking,
} from 'iconsax-react';
import { Divider } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AppDocItem from './AppDocItems';

const AppDocs = () => {
  const { t } = useTranslation();
  const [closeDocs, setCloseDocs] = useState<boolean>(true);

  return (
    <>
      <AnimatePresence>
        {closeDocs ? (
          <div className="w-full flex justify-center z-50">
            <motion.div
              key="open"
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center bg-surface dark:bg-surface-150 rounded-6 w-fit h-[128px]"
              exit={{ opacity: 0, y: 100 }}
              initial={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center bg-surface dark:bg-surface-150 rounded-6 w-fit h-[128px]">
                <div className="py-2 px-8 flex flex-col items-center gap-4">
                  <button
                    className="bg-netural-150 rounded-4 w-24 h-2"
                    onClick={() => setCloseDocs(false)}
                  />
                  <div className="flex items-center gap-10 h-full">
                    {/* DocItems */}
                    <AppDocItem
                      props={{
                        to: '/dashboard',
                        icon: ElementEqual,
                        title: t('dashboard'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/workspace',
                        icon: DirectboxReceive,
                        title: t('workspace'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/performance',
                        icon: Health,
                        title: t('performance'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/recruitment',
                        icon: ProfileAdd,
                        title: t('recruitment'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/payroll',
                        icon: CardReceive,
                        title: t('payroll'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/attendance',
                        icon: ArrowSwapHorizontal,
                        title: t('attendance'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/basic-info',
                        icon: ClipboardTick,
                        title: t('BasicInfo'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/facilities',
                        icon: TaskSquare,
                        title: t('facilities'),
                        outlined: false,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/project-management',
                        icon: ClipboardTick,
                        title: t('Project.M'),
                        outlined: false,
                        isActive: true,
                      }}
                    />
                    <Divider
                      className="h-16 bg-secondary-300 dark:bg-primary-150"
                      orientation="vertical"
                    />
                    <AppDocItem
                      props={{
                        to: '/setting',
                        icon: Setting2,
                        title: t('generalSetting'),
                        outlined: true,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/dashboard',
                        icon: HashtagSquare,
                        title: t('dashboard'),
                        outlined: true,
                        isActive: false,
                      }}
                    />
                    <AppDocItem
                      props={{
                        to: '/dashboard',
                        icon: SmsTracking,
                        title: t('dashboard'),
                        outlined: true,
                        isActive: false,
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            key="closed"
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
            exit={{ opacity: 0, y: 100 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="my-2 mx-4">
              <button
                className="bg-netural-150 rounded-4 w-48 h-3"
                onClick={() => setCloseDocs(true)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppDocs;
