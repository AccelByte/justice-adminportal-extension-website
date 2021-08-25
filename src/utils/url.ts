/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { globalVar } from "../constants/env";

export function trimSlashFromStringEnd(pathString: string) {
  let newString = pathString;
  while (newString[newString.length - 1] === "/") {
    newString = newString.slice(0, -1);
  }
  return newString;
}

export function trimSlashFromStringStart(pathString: string) {
  let newString = pathString;
  while (newString[0] === "/") {
    newString = newString.slice(1);
  }
  return newString;
}

export function trimSlashFromStringEdges(pathString: string) {
  return trimSlashFromStringStart(trimSlashFromStringEnd(pathString));
}

export function combinePaths(...paths: string[]) {
  paths.forEach((path) => {
    if (typeof path !== "string") {
      throw new Error("combinePaths error: one of the path is not a string");
    }
  });
  return paths
    .map((path) => trimSlashFromStringEdges(path))
    .map((path) => path.split("/"))
    .reduce((path, nextPath) => path.concat(nextPath), [])
    .join("/");
}

export function appendSlashToStringStart(pathString: string) {
  let newString = trimSlashFromStringStart(pathString);
  while (newString[0] !== "/") {
    newString = `/${newString}`;
  }
  return newString;
}

export function combineWithJusticeApiUrl(...paths: string[]) {
  const url = new URL(globalVar.JUSTICE_BASE_URL);
  const { origin } = url;
  const pathname = combinePaths(url.pathname, ...paths);
  return new URL(pathname, origin).toString();
}

export function findParamsFromPath(paths: string, param: string, { delimiter = "/" }: { delimiter?: string } = {}) {
  const splitPath = paths.split(delimiter);
  const paramIndex = splitPath.findIndex((path) => path === param);
  return splitPath[paramIndex + 1];
}
