/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export interface AdminPortalClient {
  isRefreshSessionLock(): Promise<boolean>;
  refreshWithLock(): () => Promise<boolean>;
}

export const getAdminPortalClient = () => {
  return window && ((window.top as any).JusticeAdminPortalClient as AdminPortalClient | undefined);
};

export const isInAdminPortal = () => {
  return !!getAdminPortalClient();
};

export const withAdminPortalClient = <T>(func: (adminPortalClient: AdminPortalClient) => T | null): T | null => {
  const adminPortalClient = getAdminPortalClient();
  if (!adminPortalClient) return null;
  return func(adminPortalClient);
};
