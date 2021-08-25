/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { guardNetworkCall } from "../networkCallTypeguard";
import { Network } from "../networkManager";
import * as ioTs from "io-ts";
import { Namespace, NamespaceDecodeError } from "./models/namespace";

export const fetchNamespaces = (network: Network) => {
  return guardNetworkCall(
    () => network.get(`/basic/v1/admin/namespaces`),
    ioTs.array(Namespace),
    NamespaceDecodeError,
    (error) => error
  );
};
