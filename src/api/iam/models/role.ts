/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { z } from "zod";
import { DecodeError, ZodResponseBodyWithPagination } from "../../types";

export const RoleUser = z.object({
  displayName: z.string(),
  namespace: z.string(),
  userId: z.string(),
});

export const RolePermission = z.intersection(
  z.object({
    resource: z.string(),
    action: z.number(),
  }),
  z
    .object({
      schedAction: z.number(),
      schedCron: z.string(),
      schedRange: z.array(z.string()),
    })
    .partial()
);
export type RolePermission = z.TypeOf<typeof RolePermission>;

export const Role = z.object({
  permissions: z.array(RolePermission),
  roleId: z.string(),
  roleName: z.string(),
  isWildcard: z.boolean(),
  adminRole: z.boolean(),
});
export type Role = z.TypeOf<typeof Role>;

const RoleWithManager = z.intersection(
  Role,
  z.object({
    managers: z.array(RoleUser),
  })
);
export type RoleWithManager = z.TypeOf<typeof RoleWithManager>;

export const RoleWithManagersResponse = ZodResponseBodyWithPagination(z.array(RoleWithManager));
export type RoleWithManagersResponse = z.TypeOf<typeof RoleWithManagersResponse>;

export const NamespaceRole = z.object({
  roleId: z.string(),
  namespace: z.string(),
});
export type NamespaceRole = z.TypeOf<typeof NamespaceRole>;

export interface NamespaceRoleWithPermission extends NamespaceRole {
  permissions: RolePermission[];
}

export class RoleDecodeError extends DecodeError {}
