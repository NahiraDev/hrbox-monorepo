import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { AuthLayout, BaseLayout } from '@core/layouts';
import { useAppSelector } from '@core/redux';
import { AppErrorToast } from '@core/components';

interface AppProps {
  children: React.ReactNode;
}

export const App = ({ children }: AppProps) => {
  const lang = useAppSelector((state:any) => state.language.lang);
  const [dir, setDir] = useState<'ltr' | 'rtl'>(lang === 'en' ? 'ltr' : 'rtl');
  const { pathname } = useLocation();
  const isSSOModule = pathname.startsWith('/sso');
  const Layout = isSSOModule ? AuthLayout : BaseLayout;

  useEffect(() => {
    setDir(lang === 'en' ? 'ltr' : 'rtl');
  }, [lang]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lang}
        animate={{ opacity: 1 }}
        className={`${dir} text-foreground bg-background`}
        dir={dir}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Layout content={children} />
        <AppErrorToast />
      </motion.div>
    </AnimatePresence>
  );
};
