/*
 * Copyright (c) 2018-2019 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { globalVar } from "../constants/env";
import { combineWithJusticeApiUrl } from "../utils/url";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Network extends AxiosInstance {}

type EjectId = number;

type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
type RequestErrorInterceptor = (error: AxiosError) => Promise<unknown> | unknown;
interface RequestPairInterceptor {
  interceptor: RequestInterceptor;
  errorInterceptor: RequestErrorInterceptor;
}

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
type ResponseErrorInterceptor = (error: AxiosError) => Promise<unknown> | unknown;
interface ResponsePairInterceptor {
  interceptor: ResponseInterceptor;
  errorInterceptor: ResponseErrorInterceptor;
}

export const addGlobalRequestInterceptors = (
  interceptor: RequestInterceptor,
  errorInterceptor: RequestErrorInterceptor
): EjectId => {
  const pair = { interceptor, errorInterceptor };
  const ejectId = axios.interceptors.request.use(interceptor, errorInterceptor);
  globalRequestInterceptors.set(ejectId, pair);
  return ejectId;
};

const globalRequestInterceptors = new Map<EjectId, RequestPairInterceptor>();
export const globalResponseInterceptors = new Map<EjectId, ResponsePairInterceptor>();

const setupNetwork = () => {
  addGlobalRequestInterceptors(
    async (config: AxiosRequestConfig) => {
      const { url } = config;
      if (url) {
        if (/^https?:\/\//.test(url)) {
          config.url = url;
        } else {
          config.url = combineWithJusticeApiUrl(url);
        }
      }
      return config;
    },
    (error: Error) => error
  );
};

class NetworkManager {
  create(...configs: AxiosRequestConfig[]): Network {
    const axiosConfig = Object.assign({}, ...configs);
    const axiosInstance = axios.create(axiosConfig);
    setupNetwork();
    Array.from(globalRequestInterceptors).forEach(([, interceptorPair]) => {
      const { interceptor, errorInterceptor } = interceptorPair;
      axiosInstance.interceptors.request.use(interceptor, errorInterceptor);
    });
    Array.from(globalResponseInterceptors).forEach(([, interceptorPair]) => {
      const { interceptor, errorInterceptor } = interceptorPair;
      axiosInstance.interceptors.response.use(interceptor, errorInterceptor);
    });
    return axiosInstance;
  }

  withBearerToken(accessToken: string, config?: AxiosRequestConfig): Network {
    return this.create(config || {}, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  withSessionId(config?: AxiosRequestConfig): Network {
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
