/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { z } from "zod";
import { DecodeError } from "../../types";

export const AccountBan = z.object({
  ban: z.string(),
  banId: z.string(),
  endDate: z.string(),
});

export const NamespaceRole = z.object({
  roleId: z.string(),
  namespace: z.string(),
});

export const AccountPermission = z.intersection(
  z.object({
    action: z.number(),
    resource: z.string(),
  }),
  z
    .object({
      schedAction: z.number(),
      schedCron: z.string(),
      schedRange: z.array(z.string()),
    })
    .partial()
);

export const AdminUser = z.intersection(
  z.object({
    authType: z.string(),
    bans: z.array(AccountBan),
    country: z.string(),
    createdAt: z.string(),
    displayName: z.string(),
    emailAddress: z.string(),
    emailVerified: z.boolean(),
    enabled: z.boolean(),
    lastDateOfBirthChangedTime: z.string(),
    lastEnabledChangedTime: z.string(),
    namespace: z.string(),
    namespaceRoles: z.union([z.array(NamespaceRole), z.null()]),
    oldEmailAddress: z.string(),
    permissions: z.array(AccountPermission),
    phoneVerified: z.boolean(),
    userId: z.string(),
    roles: z.array(z.string()),
  }),
  z
    .object({
      dateOfBirth: z.string(),
      newEmailAddress: z.string(),
      phoneNumber: z.string(),
      platformId: z.string(),
      platformUserId: z.string(),
      userName: z.string(),
      deletionStatus: z.boolean(),
      platformDisplayName: z.string(),
    })
    .partial()
);
export type AdminUser = z.TypeOf<typeof AdminUser>;

export class AdminUserDecodeError extends DecodeError {}
