/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError } from "../../types";

export const AccountBan = ioTs.type({
  ban: ioTs.string,
  banId: ioTs.string,
  endDate: ioTs.string,
});

export const NamespaceRole = ioTs.type({
  roleId: ioTs.string,
  namespace: ioTs.string,
});

export const AccountPermission = ioTs.intersection([
  ioTs.type({
    action: ioTs.number,
    resource: ioTs.string,
  }),
  ioTs.partial({
    schedAction: ioTs.number,
    schedCron: ioTs.string,
    schedRange: ioTs.array(ioTs.string),
  }),
]);

export const AdminUser = ioTs.intersection([
  ioTs.type({
    authType: ioTs.string,
    bans: ioTs.array(AccountBan),
    country: ioTs.string,
    createdAt: ioTs.string,
    dateOfBirth: ioTs.string,
    displayName: ioTs.string,
    emailAddress: ioTs.string,
    emailVerified: ioTs.boolean,
    enabled: ioTs.boolean,
    lastDateOfBirthChangedTime: ioTs.string,
    lastEnabledChangedTime: ioTs.string,
    namespace: ioTs.string,
    namespaceRoles: ioTs.union([ioTs.array(NamespaceRole), ioTs.null]),
    oldEmailAddress: ioTs.string,
    permissions: ioTs.array(AccountPermission),
    phoneVerified: ioTs.boolean,
    userId: ioTs.string,
    roles: ioTs.array(ioTs.string),
  }),
  ioTs.partial({
    newEmailAddress: ioTs.string,
    phoneNumber: ioTs.string,
    platformId: ioTs.string,
    platformUserId: ioTs.string,
    userName: ioTs.string,
    deletionStatus: ioTs.boolean,
  }),
]);
export type AdminUser = ioTs.TypeOf<typeof AdminUser>;

export class AdminUserDecodeError extends DecodeError {}
