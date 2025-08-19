import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type LanguageState = {
  lang: string;
  locale: string;
};

const initialState: LanguageState = {
  lang: 'en',
  locale: 'en-US',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state: { lang: any }, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setLocalLanguage(state: { locale: any }, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
  },
});

export const { setLanguage, setLocalLanguage } = languageSlice.actions;

export const selectLanguage = (state: { language: LanguageState }) =>
  state.language;

export default languageSlice.reducer;
