export function createPath(root: string, subPath: string): string {
  return `${root}${subPath}`;
}

export const createProjectPaths = (root: string)=> {
  return {
    Root: root,
    Dashboard: createPath(root, "/dashboard"),
    Projects: createPath(root, "/projects"),
  };
}
