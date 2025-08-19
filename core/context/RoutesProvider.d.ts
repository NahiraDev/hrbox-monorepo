import type { RouteObject } from 'react-router-dom';
import * as React from 'react';
export declare const useProjectRoutes: () => RouteObject[];
interface RoutesProviderProps {
    children: React.ReactNode;
    routes: RouteObject[];
}
export declare const RoutesProvider: React.FC<RoutesProviderProps>;
export {};
//# sourceMappingURL=RoutesProvider.d.ts.map