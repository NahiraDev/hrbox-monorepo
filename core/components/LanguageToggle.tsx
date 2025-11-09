import { Global } from 'iconsax-react';
import { motion } from 'framer-motion';
import { toggleLanguage } from "@core/redux/slices/languageSlice";
import { useAppDispatch, useAppSelector } from "@core/redux/hooks";

export const LanguageToggle = () => {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state:any) => state.language.lang);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleLanguage())}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-surface-50 text-secondary-1000 dark:text-white hover:bg-surface-100 transition-colors"
      aria-label="Toggle language"
    >
      <Global size={20} />
      <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded">
        {lang.toUpperCase()}
      </span>
    </motion.button>
  );
};