import { useAppSelector, useAppDispatch } from '@hrbox/core/redux/hooks';
import {
  setLanguage,
  toggleLanguage,
  initLanguage,
  type Language,
} from '@hrbox/core/redux/slices/languageSlice';

export function useLanguage() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state:any) => state.language.lang);
  const dir = useAppSelector((state:any) => state.language.dir);
  const isInitialized = useAppSelector((state:any) => state.language.isInitialized);

  return {
    lang,
    dir,
    isInitialized,
    isFA: lang === 'fa',
    isEN: lang === 'en',
    isRTL: dir === 'rtl',
    isLTR: dir === 'ltr',

    // تابع‌ها
    setLanguage: (language: Language) => dispatch(setLanguage(language)),
    toggle: () => dispatch(toggleLanguage()),
    init: () => dispatch(initLanguage()),
  };
}