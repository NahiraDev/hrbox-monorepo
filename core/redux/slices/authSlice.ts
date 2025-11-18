import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {getCurrentDomain, getRoleConfig, Panel, RoleSlug} from "@hrbox/core/config/theme";

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
    domainTheme: Panel;
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
    domainTheme: getCurrentDomain(),
    currentPanel: null,
    loading: false,
    error: null,
};

const clearAuthStorage = (state: AuthState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedRole');

    state.isAuthenticated = false;
    state.user = null;
    state.token = null;
    state.refreshToken = null;
    state.selectedRole = null;
    state.needsRoleSelection = false;
    state.currentPanel = null;
    state.error = 'جلسه منقضی شده است.';
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDomainTheme: (state, action: PayloadAction<Panel>) => {
            state.domainTheme = action.payload;
        },

        setCurrentPanel: (state, action: PayloadAction<Panel>) => {
            state.currentPanel = action.payload;
        },

        loginSuccess: (
            state,
            action: PayloadAction<{
                userId: number;
                displayName: string;
                Token: string;
                renewalToken: string;
                roles?: UserRole[];
            }>
        ) => {
            const {userId, displayName, Token, renewalToken, roles = []} = action.payload;

            const user: User = {
                id: String(userId),
                name: displayName,
                email: '',
                roles,
            };

            state.user = user;
            state.token = Token;
            state.refreshToken = renewalToken;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.needsRoleSelection = roles.length > 1;

            localStorage.setItem('token', Token);
            localStorage.setItem('refreshToken', renewalToken);
            localStorage.setItem('user', JSON.stringify(user));

            if (roles.length === 1) {
                const role = roles[0];
                state.selectedRole = role;
                state.currentPanel = getRoleConfig(role.slug).panel;
                state.needsRoleSelection = false;
                localStorage.setItem('selectedRole', JSON.stringify(role));
            }
        },

        roleSelected: (state, action: PayloadAction<{
            role: UserRole;
            accessToken: string;
        }>) => {
            const {role, accessToken} = action.payload;
            state.selectedRole = role;
            state.token = accessToken;

            // ✅ تنظیم Panel بر اساس نقش (نه Theme)
            const roleConfig = getRoleConfig(role.slug);
            state.currentPanel = roleConfig.panel;

            state.isAuthenticated = true;
            state.needsRoleSelection = false;
            state.error = null;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('selectedRole', JSON.stringify(role));
        },

        switchRole: (state, action: PayloadAction<UserRole>) => {
            state.selectedRole = action.payload;
            const roleConfig = getRoleConfig(action.payload.slug);
            state.currentPanel = roleConfig.panel;

            localStorage.setItem('selectedRole', JSON.stringify(action.payload));
        },

        logout: (state) => {
            clearAuthStorage(state);
        },

        updateToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },

        initAuth: (state) => {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            const userStr = localStorage.getItem('user');
            const roleStr = localStorage.getItem('selectedRole');

            if (token && refreshToken && userStr) {
                try {
                    const user = JSON.parse(userStr) as User;
                    const selectedRole = roleStr ? JSON.parse(roleStr) as UserRole : null;

                    state.token = token;
                    state.refreshToken = refreshToken;
                    state.user = user;
                    state.isAuthenticated = true;

                    if (selectedRole && user.roles.some(r => r.id === selectedRole.id)) {
                        state.selectedRole = selectedRole;
                        state.currentPanel = getRoleConfig(selectedRole.slug).panel;
                        state.needsRoleSelection = false;
                    } else if (user.roles.length === 1) {
                        const role = user.roles[0];
                        state.selectedRole = role;
                        state.currentPanel = getRoleConfig(role.slug).panel;
                        state.needsRoleSelection = false;
                        localStorage.setItem('selectedRole', JSON.stringify(role));
                    } else {
                        state.needsRoleSelection = true;
                    }
                } catch (e) {
                    clearAuthStorage(state);
                }
            }
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setDomainTheme,
    setCurrentPanel,
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