/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { guardSendAndReceiveMessage } from "~/utils/iframe";
import { MessageType } from "~/models/iframe";
import { IsRefreshSessionLock, RefreshWithLock } from "~/models/parentMessage";

export interface AdminPortalClient {
  isRefreshSessionLock(): Promise<boolean>;
  refreshWithLock(): () => Promise<boolean>;
}

export const getAdminPortalClient = (): AdminPortalClient | undefined => {
  return {
    isRefreshSessionLock: isRefreshSessionLockPostMessage,
    refreshWithLock: () => refreshWithLockPostMessage,
  };
};

const isRefreshSessionLockPostMessage = async (): Promise<boolean> => {
  const isRefreshSessionLockResult = await guardSendAndReceiveMessage({
    messageToBeSent: { message: { messageType: MessageType.isRefreshSessionLock } },
    timeoutMs: 1000,
    Codec: IsRefreshSessionLock,
  });

  return new Promise<boolean>((resolve) => resolve(isRefreshSessionLockResult));
};

const refreshWithLockPostMessage = async (): Promise<boolean> => {
  const refreshWithLockResult = await guardSendAndReceiveMessage({
    messageToBeSent: { message: { messageType: MessageType.refreshWithLock } },
    timeoutMs: 1000,
    Codec: RefreshWithLock,
  });

  return new Promise<boolean>((resolve) => resolve(refreshWithLockResult));
};

export const withAdminPortalClient = <T>(func: (adminPortalClient: AdminPortalClient) => T | null): T | null => {
  const adminPortalClient = getAdminPortalClient();
  if (!adminPortalClient) return null;
  return func(adminPortalClient);
};
