/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { WILDCARD_SIGN } from "justice-js-common-utils";

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

export const pathIsInPath = (pathToCheck: string, parentPath: string, exact?: boolean): boolean => {
  const trimmedPathToCheck = trimSlashFromStringStart(trimSlashFromStringEnd(pathToCheck));
  const trimmedParentPath = trimSlashFromStringStart(trimSlashFromStringEnd(parentPath));
  const pathToCheckSegments = trimmedPathToCheck.split("/");
  const parentPathSegments = trimmedParentPath.split("/");
  if (exact && parentPathSegments.length !== pathToCheckSegments.length) {
    return false;
  }

  if (parentPathSegments.length > pathToCheckSegments.length) {
    return false;
  }
  for (let i = 0; i < parentPathSegments.length; i += 1) {
    if (
      !!pathToCheckSegments[i] &&
      (parentPathSegments[i].substr(0, 1) === ":" || parentPathSegments[i] === WILDCARD_SIGN)
    ) {
      continue;
    }
    if (parentPathSegments[i] !== pathToCheckSegments[i]) {
      return false;
    }
  }
  return true;
};
