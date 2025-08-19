import * as React from 'react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '../redux';
import { AppErrorToast } from '../components';

interface AppProps {
  children: React.ReactNode;
}
export const App = ({ children }: AppProps) => {
  const lang = useAppSelector((state) => state.language.lang);
  const [dir, setDir] = useState<'ltr' | 'rtl'>(lang === 'en' ? 'ltr' : 'rtl');

  useEffect(() => {
    setDir(lang === 'en' ? 'ltr' : 'rtl');
  }, [lang]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        animate={{ opacity: 1 }}
        className={`${dir} h-full min-h-fit`}
        dir={dir}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
        <AppErrorToast />
      </motion.div>
    </AnimatePresence>
  );
};
