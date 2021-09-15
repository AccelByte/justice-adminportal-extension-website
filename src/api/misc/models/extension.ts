/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { RolePermission } from "../../iam/models/role";

export const ExtensionSubModule = ioTs.intersection([
  ioTs.type({
    id: ioTs.string,
    title: ioTs.string,
    isEnabled: ioTs.boolean,
    permission: RolePermission,
  }),
  ioTs.partial({
    allowedNamespaces: ioTs.array(ioTs.string),
  }),
]);
export type ExtensionSubModule = ioTs.TypeOf<typeof ExtensionSubModule>;
