import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  lang: string | null;
  locale: string | null;
}

const initialState: LanguageState = {
  lang: 'en',
  locale: 'en-US',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string | null>) {
      state.lang = action.payload;
    },
    setLocalLanguage(state, action:  PayloadAction<string | null>) {
      state.locale = action.payload;
    },
  },
});

export const {setLanguage , setLocalLanguage} = languageSlice.actions;
export default languageSlice.reducer;
