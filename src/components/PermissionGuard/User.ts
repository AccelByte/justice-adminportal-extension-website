/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { CrudType } from "justice-js-common-utils";

export const adminCanReadUser = () => ({
  resource: "ADMIN:NAMESPACE:{namespace}:USER:*",
  action: CrudType.READ,
});
