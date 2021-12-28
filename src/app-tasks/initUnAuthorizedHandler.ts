/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import axios, { AxiosError } from "axios";
import { addGlobalRequestInterceptors, addGlobalResponseInterceptors } from "../api/networkManager";
import { sendMessageToParentWindow } from "~/utils/iframe";
import { sleepAsync } from "~/utils/common";
import { withAdminPortalClient } from "~/utils/adminPortalClient";
import { MessageType } from "~/models/iframe";
import { isInIframe } from "~/utils/browserIframeSwitch";

const getIsRefreshSessionLock = () => {
  if (isInIframe()) {
    const adminPortalIsRefreshLock = withAdminPortalClient((adminPortalClient) => {
      return adminPortalClient.isRefreshSessionLock();
    });
    if (!adminPortalIsRefreshLock) return null;
    return adminPortalIsRefreshLock;
  }
  return null;
};

const adminPortalRefreshWithLock = () => {
  if (isInIframe()) {
    const adminPortalRefreshWithLock = withAdminPortalClient((adminPortalClient) => {
      return adminPortalClient.refreshWithLock();
    });
    if (!adminPortalRefreshWithLock) return null;
    return adminPortalRefreshWithLock;
  }
  return null;
};

const initOnUnAuthorizedHandler = () => {
  addGlobalRequestInterceptors(
    async (config) => {
      const isRefreshSessionLock = await getIsRefreshSessionLock();
      while (isRefreshSessionLock) {
        await sleepAsync(200);
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  addGlobalResponseInterceptors(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (axios.isCancel(error)) {
        throw error;
      } else {
        const config = error.config;
        const { status } = (error && error.response) || { status: "" };
        const isUnauthorized = status && status === 401;

        if (isUnauthorized) {
          if (!isInIframe()) {
            console.error("Can't do refresh token on standalone AP extension, please manually refresh your token");
            return;
          }

          const refreshWithLock = await adminPortalRefreshWithLock();
          if (!refreshWithLock) return;

          return await refreshWithLock().then((success) => {
            if (success) {
              return axios(config);
            }
            sendMessageToParentWindow({
              message: { messageType: MessageType.sessionExpired },
            });
            throw error;
          });
        }
      }

      return Promise.reject(error);
    }
  );
};

export default initOnUnAuthorizedHandler;
