import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '@core/translate';

export type Language = 'en' | 'fa';

interface LanguageState {
  lang: Language;
  dir: 'ltr' | 'rtl';
  isInitialized: boolean;
}

const initialState: LanguageState = {
  lang: 'en',
  dir: 'ltr',
  isInitialized: false,
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
      state.dir = action.payload === 'fa' ? 'rtl' : 'ltr';

      i18n.changeLanguage(action.payload);

      document.documentElement.lang = action.payload;
      document.documentElement.dir = state.dir;

      localStorage.setItem('lang', action.payload);
    },

    toggleLanguage: (state) => {
      const newLang = state.lang === 'en' ? 'fa' : 'en';
      state.lang = newLang;
      state.dir = newLang === 'fa' ? 'rtl' : 'ltr';

      i18n.changeLanguage(newLang);
      document.documentElement.lang = newLang;
      document.documentElement.dir = state.dir;
      localStorage.setItem('lang', newLang);
    },

    initLanguage: (state) => {
      const savedLang = (localStorage.getItem('lang') as Language) || 'en';
      const browserLang = navigator.language.startsWith('fa') ? 'fa' : 'en';

      state.lang = savedLang || browserLang;
      state.dir = state.lang === 'fa' ? 'rtl' : 'ltr';
      state.isInitialized = true;

      i18n.changeLanguage(state.lang);
      document.documentElement.lang = state.lang;
      document.documentElement.dir = state.dir;
    },
  },
});

export const { setLanguage, toggleLanguage, initLanguage } = languageSlice.actions;
export default languageSlice.reducer;