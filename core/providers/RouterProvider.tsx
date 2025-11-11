import { useAppSelector } from '@hrbox/core/redux/hooks';
import { ReactNode, useMemo } from 'react';
import { router } from "@hrbox/core/routes/router";

interface RouterProviderProps {
  children: ReactNode;
}

export function RouterContextProvider({ children }: { children: ReactNode }) {
  const authState = useAppSelector((state: any) => state.auth);

  const routerContext = useMemo(
    () => ({
      auth: {
        isAuthenticated: authState.isAuthenticated,
        needsRoleSelection: authState.needsRoleSelection,
        currentPanel: authState.currentPanel,
        selectedRole: authState.selectedRole,
        user: authState.user,
      },
    }),
    [authState]
  );

  if (!router) {
    return null;
  }

  router.update({
    context: routerContext as any,
  });

  return <>{children}</>;
}