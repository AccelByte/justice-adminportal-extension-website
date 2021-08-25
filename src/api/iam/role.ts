/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { guardNetworkCall } from "../networkCallTypeguard";
import { Network } from "../networkManager";
import { Role, RoleDecodeError, RoleWithManagersResponse } from "./models/role";

export const fetchRoles = (network: Network) => {
  return guardNetworkCall(
    () => network.get(`/iam/v3/admin/roles`),
    RoleWithManagersResponse,
    RoleDecodeError,
    (error) => error
  );
};

export const fetchRole = (network: Network, { roleId }: { roleId: string }) => {
  return guardNetworkCall(
    () => network.get(`/iam/v4/admin/roles/${roleId}`),
    Role,
    RoleDecodeError,
    (error) => error
  );
};
