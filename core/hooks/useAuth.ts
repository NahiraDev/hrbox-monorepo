import { useAppDispatch, useAppSelector } from "@hrbox/core/redux/hooks";
import { shallowEqual } from "react-redux";
import {
  initAuth,
  loginSuccess,
  logout,
  roleSelected,
  setError,
  setLoading,
  switchRole,
  updateToken,
  type UserRole
} from "@hrbox/core/redux/slices/authSlice";

// ✅ تعریف یک آرایه خالی ثابت خارج از component
const EMPTY_ARRAY: UserRole[] = [];

export function useAuth() {
  const dispatch = useAppDispatch();

  // ✅ استفاده از یک useSelector با shallowEqual
  const authState = useAppSelector(
    (state: any) => ({
      isAuthenticated: state.auth.isAuthenticated,
      user: state.auth.user,
      roles: state.auth.user?.roles || EMPTY_ARRAY, // ✅ استفاده از constant
      selectedRole: state.auth.selectedRole,
      needsRoleSelection: state.auth.needsRoleSelection,
      currentPanel: state.auth.currentPanel,
      currentDomain: state.auth.currentDomain,
      loading: state.auth.loading,
      error: state.auth.error
    }),
    shallowEqual // ✅ این خیلی مهمه!
  );

  return {
    ...authState, // ✅ spread کردن authState

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

    setError: (error: string | null) => dispatch(setError(error))
  };
}