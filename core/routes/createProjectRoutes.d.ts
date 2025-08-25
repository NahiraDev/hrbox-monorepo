import { type RouteObject } from 'react-router-dom';
import * as React from 'react';
interface ProjectComponents {
    [key: string]: React.ComponentType<any>;
}
export declare function createProjectRoutes(basePath: string, components: ProjectComponents, indexRedirect?: string): RouteObject[];
export {};
//# sourceMappingURL=createProjectRoutes.d.ts.map