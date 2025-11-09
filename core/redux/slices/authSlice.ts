import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Domain, Panel, RoleSlug, getRoleConfig, getCurrentDomain } from '@core/config/theme';

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
  token: string | null;
  refreshToken: string | null;
  selectedRole: UserRole | null;
  needsRoleSelection: boolean;
  currentDomain: Domain;
  currentPanel: Panel | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
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
    // تنظیم دامنه جاری
    setCurrentDomain: (state, action: PayloadAction<Domain>) => {
      state.currentDomain = action.payload;
    },

    // موفقیت لاگین
    loginSuccess: (state, action: PayloadAction<{
      user: User;
      token: string;
      refreshToken: string;
    }>) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.loading = false;
      state.error = null;

      // ذخیره در localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      // اگر بیش از یک نقش داشت
      if (user.roles.length > 1) {
        state.needsRoleSelection = true;
        state.isAuthenticated = false;
      }
      // اگر فقط یک نقش داشت
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
      state.token = null;
      state.refreshToken = null;
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
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },

    // بارگذاری اطلاعات ذخیره شده
    initAuth: (state) => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      const selectedRole = localStorage.getItem('selectedRole');

      if (token && user && selectedRole) {
        try {
          state.token = token;
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