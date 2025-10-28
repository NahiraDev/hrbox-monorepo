import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FormCacheState {
  [formId: string]: {
    values: Record<string, any>;
    timestamp: number;
  };
}

const initialState: FormCacheState = {};

export const formCacheSlice = createSlice({
  name: 'formCache',
  initialState,
  reducers: {
    updateFormField(
      state,
      action: PayloadAction<{ formId: string; fieldName: string; value: any }>
    ) {
      const { formId, fieldName, value } = action.payload;

      if (!state[formId]) {
        state[formId] = { values: {}, timestamp: Date.now() };
      }

      state[formId].values[fieldName] = value;
      state[formId].timestamp = Date.now();
    },

    updateFormValues(
      state,
      action: PayloadAction<{ formId: string; values: Record<string, any> }>
    ) {
      const { formId, values } = action.payload;

      state[formId] = {
        values: { ...values },
        timestamp: Date.now(),
      };
    },

    clearFormCache(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },

    clearAllFormCaches(state) {
      return {};
    },

    clearExpiredCaches(state, action: PayloadAction<number>) {
      const expiryTime = action.payload; // in milliseconds
      const now = Date.now();

      Object.keys(state).forEach((formId) => {
        if (now - state[formId].timestamp > expiryTime) {
          delete state[formId];
        }
      });
    },
  },
});

export const {
  updateFormField,
  updateFormValues,
  clearFormCache,
  clearAllFormCaches,
  clearExpiredCaches,
} = formCacheSlice.actions;

export default formCacheSlice.reducer;
