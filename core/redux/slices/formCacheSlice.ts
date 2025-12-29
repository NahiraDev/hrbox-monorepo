import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FormCacheEntry {
  values: Record<string, any>;
  timestamp: number;
  mode?: 'create' | 'edit' | 'view';
}

export interface FormCacheState {
  [formId: string]: FormCacheEntry;
}

const initialState: FormCacheState = {};


export const formCacheSlice = createSlice({
  name: 'formCache',
  initialState,
  reducers: {
    updateFormField(
        state,
        action: PayloadAction<{
          formId: string;
          fieldName: string;
          value: any;
        }>
    ) {
      const { formId, fieldName, value } = action.payload;

      if (!state[formId]) {
        state[formId] = {
          values: {},
          timestamp: Date.now(),
        };
      }

      state[formId].values[fieldName] = value;
      state[formId].timestamp = Date.now();
    },

    updateFormValues(
        state,
        action: PayloadAction<{
          formId: string;
          values: Record<string, any>;
          mode?: 'create' | 'edit' | 'view';
        }>
    ) {
      const { formId, values, mode } = action.payload;

      state[formId] = {
        values: { ...values },
        timestamp: Date.now(),
        mode,
      };
    },

    /**
     * پاک کردن cache یک فرم
     */
    clearFormCache(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },

    /**
     * پاک کردن تمام cache‌ها
     */
    clearAllFormCaches(state) {
      return {};
    },

    /**
     * پاک کردن cache های منقضی شده
     */
    clearExpiredCaches(
        state,
        action: PayloadAction<number> // expiry time in ms
    ) {
      const expiryTime = action.payload;
      const now = Date.now();

      Object.keys(state).forEach((formId) => {
        if (now - state[formId].timestamp > expiryTime) {
          delete state[formId];
        }
      });
    },

    getFormCache: (state, action: PayloadAction<string>) => {
      return state[action.payload] || null;
    },
  },
});

export const {
  updateFormField,
  updateFormValues,
  clearFormCache,
  clearAllFormCaches,
  clearExpiredCaches,
  getFormCache,
} = formCacheSlice.actions;

export default formCacheSlice.reducer;
