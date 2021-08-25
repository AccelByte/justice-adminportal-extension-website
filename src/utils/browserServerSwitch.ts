/*
 * Copyright (c) 2019 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export function isOnBrowser() {
  try {
    if (window) {
      return true;
    }
    // eslint-disable-next-line
  } catch (error) {}
  return false;
}

export function runOnBrowserOnly(func: Function) {
  if (isOnBrowser()) {
    return func();
  }
  return undefined;
}

export function runOnServerOnly(func: Function) {
  if (!isOnBrowser()) {
    return func();
  }
  return undefined;
}
