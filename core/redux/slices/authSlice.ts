import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Domain, Panel, RoleSlug, getRoleConfig, getCurrentDomain } from '@hrbox/core/config/theme';

export interface UserRole {
  id: string;
  name: string;
  slug: RoleSlug;
  permissions: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: UserRole[];
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  userId: string | null;
  Token: string | null;
  renewalToken: string | null;
  selectedRole: UserRole | null;
  needsRoleSelection: boolean;
  currentDomain: Domain;
  currentPanel: Panel | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user:null,
  userId: null,
  Token: null,
  renewalToken: null,
  selectedRole: null,
  needsRoleSelection: false,
  currentDomain: getCurrentDomain(),
  currentPanel: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentDomain: (state, action: PayloadAction<Domain>) => {
      state.currentDomain = action.payload;
    },

    loginSuccess: (state, action: PayloadAction<{
      user: User;
      userId: string;
      Token: string;
      renewalToken: string;
    }>) => {
      const { userId, Token, renewalToken } = action.payload;
      state.user = null;
      state.userId = userId;
      state.Token = Token;
      state.renewalToken = renewalToken;
      state.loading = false;
      state.error = null;

      localStorage.setItem('Token', Token);
      localStorage.setItem('renewalToken', renewalToken);
      localStorage.setItem('userId', userId);
      localStorage.setItem('user', JSON.stringify(userId));

      if (user.roles.length > 1) {
        state.needsRoleSelection = true;
        state.isAuthenticated = false;
      }

      else if (user.roles.length === 1) {
        const role = user.roles[0];
        state.selectedRole = role;
        state.currentPanel = getRoleConfig(role.slug).panel;
        state.isAuthenticated = true;
        state.needsRoleSelection = false;
        localStorage.setItem('selectedRole', JSON.stringify(role));
      }
    },

    // انتخاب نقش
    roleSelected: (state, action: PayloadAction<{
      role: UserRole;
      accessToken: string;
    }>) => {
      const { role, accessToken } = action.payload;
      state.selectedRole = role;
      state.token = accessToken;
      state.currentPanel = getRoleConfig(role.slug).panel;
      state.isAuthenticated = true;
      state.needsRoleSelection = false;
      state.error = null;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('selectedRole', JSON.stringify(role));
    },

    // تبدیل نقش
    switchRole: (state, action: PayloadAction<UserRole>) => {
      state.selectedRole = action.payload;
      state.currentPanel = getRoleConfig(action.payload.slug).panel;
      localStorage.setItem('selectedRole', JSON.stringify(action.payload));
    },

    // لاگ آوت
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.Token = null;
      state.renewalToken = null;
      state.selectedRole = null;
      state.needsRoleSelection = false;
      state.currentPanel = null;
      state.error = null;

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('selectedRole');
    },

    // بروزرسانی توکن
    updateToken: (state, action: PayloadAction<string>) => {
      state.Token = action.payload;
      localStorage.setItem('token', action.payload);
    },

    initAuth: (state) => {
      const token = localStorage.getItem('Token');
      const user = localStorage.getItem('userId');
      const selectedRole = localStorage.getItem('selectedRole');

      if (token && user && selectedRole) {
        try {
          state.Token = token;
          state.user = JSON.parse(user);
          state.selectedRole = JSON.parse(selectedRole);
          state.currentPanel = getRoleConfig(JSON.parse(selectedRole).slug).panel;
          state.isAuthenticated = true;
        } catch (e) {
          console.error('Failed to parse auth data', e);
          state.logout(state);
        }
      }
    },

    // تنظیم حالت لودینگ
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // تنظیم خطا
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentDomain,
  loginSuccess,
  roleSelected,
  switchRole,
  logout,
  updateToken,
  initAuth,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;