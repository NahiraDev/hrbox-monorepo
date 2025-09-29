import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface InputState {
  [key: string]: string;
}

const initialState: InputState = {
  key:""
};

export const AppInputSlice = createSlice({
  name: 'AppInput',
  initialState,
  reducers: {
    updateAppInputValue(state, action: PayloadAction<{ name: string; value: any }>) {
      state[action.payload.name] = action.payload.value;
    },
    preloadAppModalData(state, action: PayloadAction<{ modalName: string; data: any }>) {
      Object.assign(state, action.payload.data);
    },
    resetAppModalData(state, action: PayloadAction<{ modalName: string }>) {
      Object.keys(state).forEach(key => {
        if (key.startsWith(action.payload.modalName)) delete state[key];
      });
    },
  },
});

export const { updateAppInputValue, preloadAppModalData, resetAppModalData } = AppInputSlice.actions;
