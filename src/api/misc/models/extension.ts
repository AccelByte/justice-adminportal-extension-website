/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { z } from "zod";
import { RolePermission } from "../../iam/models/role";

export const ExtensionSubModule = z.intersection(
  z.object({
    id: z.string(),
    title: z.string(),
    isEnabled: z.boolean(),
    permission: RolePermission,
  }),
  z
    .object({
      allowedNamespaces: z.array(z.string()),
    })
    .partial()
);
export type ExtensionSubModule = z.TypeOf<typeof ExtensionSubModule>;

export const APIExtensionSubModule = z.intersection(
  z.object({
    id: z.string(),
    title: z.record(z.string(), z.string()),
    isEnabled: z.boolean(),
    permission: RolePermission,
  }),
  z
    .object({
      allowedNamespaces: z.array(z.string()),
    })
    .partial()
);
export type APIExtensionSubModule = z.TypeOf<typeof APIExtensionSubModule>;

export const ExtensionModule = z.intersection(
  z.object({
    id: z.string(),
    title: z.record(z.string(), z.string()),
    icon: z.string(),
    isEnabled: z.boolean(),
    subModules: z.array(APIExtensionSubModule),
  }),
  z
    .object({
      permission: RolePermission,
    })
    .partial()
);
export type ExtensionModule = z.TypeOf<typeof ExtensionModule>;

export const ExtensionManifest = z.object({
  name: z.string(),
  author: z.string(),
  modules: z.array(ExtensionModule),
});
export type ExtensionManifest = z.TypeOf<typeof ExtensionManifest>;

export class ExtensionManifestDecodeError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ExtensionManifestDecodeError.prototype);
  }
}
