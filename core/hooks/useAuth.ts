import { useAppSelector, useAppDispatch } from '@hrbox/core/redux/hooks';
import {
  setCurrentDomain,
  loginSuccess,
  roleSelected,
  switchRole,
  logout,
  updateToken,
  initAuth,
  setLoading,
  setError,
  type User,
  type UserRole,
} from '@hrbox/core/redux/slices/authSlice';
import type { Domain } from '@core/config/design';

export function useAuth() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated);
  const user = useAppSelector((state:any) => state.auth.user);
  const roles = useAppSelector((state:any) => state.auth.roles);
  const selectedRole = useAppSelector((state:any) => state.auth.selectedRole);
  const needsRoleSelection = useAppSelector((state:any) => state.auth.needsRoleSelection);
  const currentPanel = useAppSelector((state:any) => state.auth.currentPanel);
  const currentDomain = useAppSelector((state:any) => state.auth.currentDomain);
  const loading = useAppSelector((state:any) => state.auth.loading);
  const error = useAppSelector((state:any) => state.auth.error);

  return {
    // حالت
    isAuthenticated,
    user,
    roles,
    selectedRole,
    needsRoleSelection,
    currentPanel,
    currentDomain,
    loading,
    error,

    // تابع‌ها
    setCurrentDomain: (domain: Domain) => dispatch(setCurrentDomain(domain)),

    loginSuccess: (user: User, token: string, refreshToken: string) =>
      dispatch(loginSuccess({ user, token, refreshToken })),

    roleSelected: (role: UserRole, accessToken: string) =>
      dispatch(roleSelected({ role, accessToken })),

    switchRole: (role: UserRole) => dispatch(switchRole(role)),

    logout: () => dispatch(logout()),

    updateToken: (token: string) => dispatch(updateToken(token)),

    init: () => dispatch(initAuth()),

    setLoading: (loading: boolean) => dispatch(setLoading(loading)),

    setError: (error: string | null) => dispatch(setError(error)),
  };
}
