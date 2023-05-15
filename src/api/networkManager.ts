/*
 * Copyright (c) 2018-2023 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Network as SDKNetwork } from "@accelbyte/sdk";
import { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { globalVar } from "../constants/env";
import { combineWithJusticeApiUrl } from "../utils/url";

/**
 * @deprecated this type is only for old extension features.
 * Please directly use `AxiosInstance` instead.
 */
export type Network = AxiosInstance;

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
type ResponseErrorInterceptor = (error: AxiosError) => Promise<unknown> | unknown;
interface ResponsePairInterceptor {
  interceptor: ResponseInterceptor;
  errorInterceptor: ResponseErrorInterceptor;
}
export const globalResponseInterceptors = new Map<number, ResponsePairInterceptor>();

const injectApiUrl = (config: AxiosRequestConfig) => {
  const { url } = config;
  if (url) {
    if (/^https?\:\/\//.test(url)) {
      config.url = url;
    } else {
      config.url = combineWithJusticeApiUrl(url);
    }
  }
  return config;
};

class NetworkManager {
  create(...configs: AxiosRequestConfig[]): AxiosInstance {
    const axiosInstance = SDKNetwork.create(Object.assign({}, ...configs));
    axiosInstance.interceptors.request.use(injectApiUrl);
    return axiosInstance;
  }

  withBearerToken(accessToken: string, config?: AxiosRequestConfig): AxiosInstance {
    return this.create(config || {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  withSessionId(config?: AxiosRequestConfig): AxiosInstance {
    return this.create(config || {}, {
      withCredentials: true,
    });
  }

  withCredentials(config?: AxiosRequestConfig) {
    const bearerToken = globalVar.JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE;
    if (globalVar.NODE_ENV === "development" && !!bearerToken) {
      return this.withBearerToken(bearerToken, config);
    }
    return this.withSessionId(config);
  }
}

const networkManager = new NetworkManager();
export default networkManager;
