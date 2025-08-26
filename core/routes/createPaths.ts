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

  const extractRoutes = (
    obj: Record<string, any>,
  ): Record<string, Record<string, string>> => {
    const routes: Record<string, Record<string, string>> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !['root', 'path', 'link'].includes(key)
      ) {
        const subRoutes: Record<string, string> = {};

        for (const [subKey, subValue] of Object.entries(value)) {
          if (
            typeof subValue === 'string' &&
            !['root', 'path', 'link'].includes(subKey)
          ) {
            subRoutes[subKey] = subValue;
          }
        }
        if (Object.keys(subRoutes).length > 0) {
          routes[key] = subRoutes;
        }
      }
    }

    return routes;
  };

  const routes = extractRoutes(nestedRoutes);

  return {
    root,
    path,
    link,
    routes,
    ...nestedRoutes,
  } as {
    root: string;
    path: typeof path;
    link: typeof link;
    routes: typeof routes;
  } & typeof nestedRoutes;
};
