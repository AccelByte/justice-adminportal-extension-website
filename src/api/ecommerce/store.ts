/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { Network } from "../networkManager";
import { guardNetworkCall } from "../networkCallTypeguard";
import { Store, StoreDecodeError } from "./models/store";

export const fetchStores = async (network: Network, namespace: string) => {
  return guardNetworkCall(
    () => network.get(`/platform/admin/namespaces/${namespace}/stores`),
    ioTs.array(Store),
    StoreDecodeError,
    (error) => error
  );
};
