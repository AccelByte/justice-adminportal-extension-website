/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { AdminUser, AdminUserDecodeError } from "./models/user";
import { Network } from "../networkManager";
import { guardNetworkCall } from "../networkCallTypeguard";

export const fetchCurrentUser = (network: Network) => {
  return guardNetworkCall(
    () => network.get(`/iam/v3/admin/users/me`),
    AdminUser,
    AdminUserDecodeError,
    (error) => error
  );
};
