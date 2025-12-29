import { createRouter } from "@tanstack/react-router";
import { useAppSelector } from "@hrbox/core/redux/hooks";
import { ReactNode, useEffect, useMemo } from "react";
import { createRouteTree } from "@hrbox/core/routes/tanstackGenerator";

let _router: any = null;

export function initRouter() {
  if (_router) return _router;

  const routeTree = createRouteTree();

  _router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    context: { auth: undefined! },
    defaultNotFoundComponent: () => (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
      </div>
    )
  });

  return _router;
}

export function getRouter() {
  if (!_router) {
    throw new Error("Router not initialized! Call initRouter() first");
  }
  return _router;
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
        user: authState.user
      }
    }),
    [authState]
  );

  const router = getRouter();

  useEffect(() => {
    router.update({ context: routerContext as any });
  }, [router, routerContext]);

  return <>{children}</>;
}