import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router-dom';
import { useTheme } from '@heroui/use-theme';

import DarkModeBg from '../assets/img/darkmode-bg.webp';
import LightModeBg from '../assets/img/lightmode-bg.webp';
import { serviceRegistry } from '../helpers';

export const MotionRouter = () => {
  const location = useLocation();
  const routes = serviceRegistry.getAllRoutes();
  const element = useRoutes(routes);
  const { theme } = useTheme();

  return (
    <>
      <div
        className="relative dark:bg-mobile-bg-dark bg-mobile-bg lg:bg-cover lg:bg-center bg-no-repeat"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundImage: `url(${theme ? DarkModeBg : LightModeBg})`,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}
          transition={{ duration: 0.5 }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
