import { useAppSelector, useAppDispatch } from '@hrbox/core/redux/hooks';
import {
  loginSuccess,
  roleSelected,
  switchRole,
  logout,
  updateToken,
  initAuth,
  setLoading,
  setError,
  type UserRole, setDomainTheme,
} from '@hrbox/core/redux/slices/authSlice';
import { Domain } from "@hrbox/core/config/theme/domains";

export function useAuth() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state:any) => state.auth.isAuthenticated);
  const user = useAppSelector((state:any) => state.auth.user);
  // const roles = useAppSelector((state:any) => state.auth.roles);
  const roles = useAppSelector((state: any) => state.auth.user?.roles || []);
  const selectedRole = useAppSelector((state:any) => state.auth.selectedRole);
  const needsRoleSelection = useAppSelector((state:any) => state.auth.needsRoleSelection);
  const currentPanel = useAppSelector((state:any) => state.auth.currentPanel);
  const currentDomain = useAppSelector((state:any) => state.auth.currentDomain);
  const loading = useAppSelector((state:any) => state.auth.loading);
  const error = useAppSelector((state:any) => state.auth.error);

  return {
    isAuthenticated,
    user,
    roles,
    selectedRole,
    needsRoleSelection,
    currentPanel,
    currentDomain,
    loading,
    error,


    loginSuccess: (
  userId: number,
  displayName: string,
  Token: string,
  renewalToken: string,
  roles?: UserRole[]
) => dispatch(loginSuccess({ userId, displayName, Token, renewalToken, roles })),

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
