export declare const createPaths: <T extends Record<string, string | Record<string, any>>>(root: string, subRoutes?: T) => {
    root: string;
    path: (subPath?: string) => string;
    link: (subPath?: string) => {
        path: string;
        href: string;
    };
} & T;
//# sourceMappingURL=createPaths.d.ts.map