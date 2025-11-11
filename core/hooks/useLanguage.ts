import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@hrbox/core/redux/hooks';
import { setLanguage, toggleLanguage as toggleLang } from '@hrbox/core/redux/slices/languageSlice';
import type { Language } from '@hrbox/core/redux/slices/languageSlice';

export function useLanguage() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state: any) => state.language.lang);
  const dir = useAppSelector((state: any) => state.language.dir);
  const isInitialized = useAppSelector((state: any) => state.language.isInitialized);

  const toggleLanguage = useCallback(() => {
    dispatch(toggleLang());
  }, [dispatch]);

  const changeLanguage = useCallback(
    (newLang: Language) => {
      dispatch(setLanguage(newLang));
    },
    [dispatch]
  );

  return {
    lang,
    dir,
    isInitialized,
    toggleLanguage,
    changeLanguage,
    isRTL: dir === 'rtl',
    isLTR: dir === 'ltr',
    isFarsi: lang === 'fa',
    isEnglish: lang === 'en',
  };
}