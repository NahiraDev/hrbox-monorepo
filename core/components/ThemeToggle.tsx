import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@hrbox/core/redux/hooks';
import { toggleThemeMode } from '@hrbox/core/redux/slices/themeSlice';

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state: any) => state.theme.mode);
  const isDark = mode === 'dark';

  // colour that follows Tailwind’s dark-mode classes
  const strokeColor = isDark ? '#ffffff' : '#04070E';
  console.log('isDark from Redux:', isDark);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleThemeMode())}
      className="relative flex cursor-pointer items-center justify-center rounded-lg bg-surface-50 text-secondary-1000 dark:text-white hover:bg-surface-100 transition-colors"
      aria-label="Toggle theme"
    >
      {/* ---------- Moon (visible in LIGHT → fades out in DARK) ---------- */}
      <motion.div
        initial={true}
        animate={{
          rotate: isDark ? 180 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="h-[52px] w-[52px] flex justify-center items-center"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.36762 14.4904C2.78762 20.4988 7.88596 25.3871 13.9876 25.6554C18.2926 25.8421 22.1426 23.8354 24.4526 20.6738C25.4093 19.3788 24.896 18.5154 23.2976 18.8071C22.516 18.9471 21.711 19.0054 20.871 18.9704C15.166 18.7371 10.4993 13.9654 10.476 8.33044C10.4643 6.81378 10.7793 5.37878 11.351 4.07211C11.981 2.62544 11.2226 1.93711 9.76429 2.55544C5.14429 4.50378 1.98262 9.15878 2.36762 14.4904Z"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* ---------- Sun (visible in DARK → fades in) ---------- */}
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2V4M14 24V26M4 14H2M6.31412 6.31412L4.8999 4.8999M21.6859 6.31412L23.1001 4.8999M6.31412 21.6859L4.8999 23.1001M21.6859 21.6859L23.1001 23.1001M26 14H24M19.0711 19.0711L17.6569 17.6569M19.0711 8.92893L17.6569 10.3431M8.92893 19.0711L10.3431 17.6569M8.92893 8.92893L10.3431 10.3431M14 18C16.2091 18 18 16.2091 18 14C18 11.7909 16.2091 10 14 10C11.7909 10 10 11.7909 10 14C10 16.2091 11.7909 18 14 18Z"
            stroke={strokeColor}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};