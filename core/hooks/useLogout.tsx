import { useAppDispatch } from "@hrbox/core/redux/hooks";
import { logout } from "@hrbox/core/redux/slices/authSlice";
import { useNavigation } from "./useNavigation";
import { Paths } from "@hrbox/module/paths";

export function useLogout() {
  const dispatch = useAppDispatch();
  const { push } = useNavigation();

  return () => {
    dispatch(logout());
    push({to:Paths.SSO.logout});
  };
}

function Header() {
  const logout = useLogout();

  return (
    <button onClick={logout}>
      خروج
      </button>
  );
}