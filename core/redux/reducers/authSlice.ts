import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: window.localStorage.getItem('Token'),
  refreshToken: window.localStorage.getItem('renewalToken'),
  user: JSON.parse(window.localStorage.getItem('userId') || 'null'),
  isAuthenticated: !!window.localStorage.getItem('Token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; refreshToken?: string; user?: any }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
      state.user = action.payload.user || state.user;
      state.isAuthenticated = true;

      window.localStorage.setItem('Token', action.payload.token);
      if (action.payload.refreshToken) {
        window.localStorage.setItem('renewalToken', action.payload.refreshToken);
      }
      if (action.payload.user) {
        window.localStorage.setItem('userId', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;

      window.localStorage.removeItem('Token');
      window.localStorage.removeItem('renewalToken');
      window.localStorage.removeItem('userId');
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      window.localStorage.setItem('Token', action.payload);
    },
  },
});

export const { setCredentials, logout, updateToken } = authSlice.actions;
export default authSlice.reducer;
