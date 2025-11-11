import { Moon, Sun1 } from 'iconsax-reactjs';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from "@hrbox/core/redux/hooks";
import { toggleThemeMode } from "@hrbox/core/redux/slices/themeSlice";

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state:any) => state.theme.isDark);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleThemeMode())}
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
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.36762 14.4904C2.78762 20.4988 7.88596 25.3871 13.9876 25.6554C18.2926 25.8421 22.1426 23.8354 24.4526 20.6738C25.4093 19.3788 24.896 18.5154 23.2976 18.8071C22.516 18.9471 21.711 19.0054 20.871 18.9704C15.166 18.7371 10.4993 13.9654 10.476 8.33044C10.4643 6.81378 10.7793 5.37878 11.351 4.07211C11.981 2.62544 11.2226 1.93711 9.76429 2.55544C5.14429 4.50378 1.98262 9.15878 2.36762 14.4904Z" stroke="#04070E" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
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
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.36762 14.4904C2.78762 20.4988 7.88596 25.3871 13.9876 25.6554C18.2926 25.8421 22.1426 23.8354 24.4526 20.6738C25.4093 19.3788 24.896 18.5154 23.2976 18.8071C22.516 18.9471 21.711 19.0054 20.871 18.9704C15.166 18.7371 10.4993 13.9654 10.476 8.33044C10.4643 6.81378 10.7793 5.37878 11.351 4.07211C11.981 2.62544 11.2226 1.93711 9.76429 2.55544C5.14429 4.50378 1.98262 9.15878 2.36762 14.4904Z" stroke="#04070E" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </motion.div>
    </motion.button>
  );
};
