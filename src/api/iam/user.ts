/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { AdminUser, AdminUserDecodeError } from "./models/user";
import { AxiosInstance } from "axios";
import { Validate } from "@accelbyte/sdk";

export const fetchCurrentUser = (network: AxiosInstance) => {
  return Validate.responseType<AdminUser>(() => network.get(`/iam/v3/admin/users/me`), AdminUser);
};
