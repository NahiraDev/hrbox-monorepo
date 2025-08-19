export const createPaths = <
  T extends Record<string, string | Record<string, any>>,
>(
  root: string,
  subRoutes: T = {} as T,
) => {
  const path = (subPath: string = ''): string => `${root}${subPath}`;

  const link = (subPath: string = '') => {
    const fullPath = path(subPath);

    return {
      path: fullPath,
      href: fullPath,
    };
  };

  function buildRoutes<R extends Record<string, any>>(
    routes: R,
    base: string,
  ): R {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(routes)) {
      if (typeof value === 'string') {
        result[key] = `${base}${value}`;
      } else if (typeof value === 'object') {
        const newBase = (value as any).root
          ? `${base}${(value as any).root}`
          : base;

        result[key] = buildRoutes(value, newBase);
      }
    }

    return result as R;
  }

  const nestedRoutes = buildRoutes(subRoutes, root);

  return {
    root,
    path,
    link,
    ...nestedRoutes,
  } as {
    root: string;
    path: typeof path;
    link: typeof link;
  } & typeof nestedRoutes;
};
