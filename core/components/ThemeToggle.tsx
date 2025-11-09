import { Moon, Sun1 } from 'iconsax-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from "@core/redux/hooks";
import { toggleTheme } from "@core/redux/slices/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state:any) => state.theme.isDark);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTheme())}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-surface-50 text-secondary-1000 dark:text-white hover:bg-surface-100 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun1 size={20} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={20} />
      </motion.div>
    </motion.button>
  );
};
