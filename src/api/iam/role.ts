/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Validate } from "@accelbyte/sdk";
import { AxiosInstance } from "axios";
import { Role, RoleWithManagersResponse } from "./models/role";

export const fetchRoles = (network: AxiosInstance) => {
  return Validate.responseType<RoleWithManagersResponse>(
    () => network.get(`/iam/v3/admin/roles`),
    RoleWithManagersResponse
  );
};

export const fetchRole = (network: AxiosInstance, { roleId }: { roleId: string }) => {
  return Validate.responseType<Role>(() => network.get(`/iam/v4/admin/roles/${roleId}`), Role);
};
