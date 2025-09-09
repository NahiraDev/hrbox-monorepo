import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useRoutes } from 'react-router-dom';
import { serviceRegistry } from '../helpers';

export const MotionRouter = () => {
  const location = useLocation();
  const routes = serviceRegistry.getAllRoutes();
  const element = useRoutes(routes);

  return (
    <>

      <AnimatePresence mode="wait">
        <motion.div
          key={location.key}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          className="h-full rounded-xl"
          transition={{ duration: 0.5 }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
