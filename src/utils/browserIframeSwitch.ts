/*
 * Copyright (c) 2019 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export function isInIframe() {
  try {
    if (window.parent.length > 0) {
      return true;
    }
    // eslint-disable-next-line
  } catch (error) {}
  return false;
}

export function runInIframeOnly(func: () => void) {
  if (isInIframe()) {
    return func();
  }
  return undefined;
}

export function runInBrowserOnly(func: () => void) {
  if (!isInIframe()) {
    return func();
  }
  return undefined;
}
