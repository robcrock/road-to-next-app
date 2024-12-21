import { closest } from "fastest-levenshtein";

export const getActivePath = (
  path: string,
  paths: string[],
  ignorePaths?: string[]
) => {
  const closestPath = closest(path, paths.concat(ignorePaths || []));
  const index = closestPath.indexOf(closestPath);

  return { active: closestPath, activeIndex: index };
};
