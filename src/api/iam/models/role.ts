/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError, ResponseBodyWithPagination } from "../../types";

export const RoleUser = ioTs.type({
  displayName: ioTs.string,
  namespace: ioTs.string,
  userId: ioTs.string,
});

export const RolePermission = ioTs.intersection([
  ioTs.type({
    resource: ioTs.string,
    action: ioTs.number,
  }),
  ioTs.partial({
    schedAction: ioTs.number,
    schedCron: ioTs.string,
    schedRange: ioTs.array(ioTs.string),
  }),
]);
export type RolePermission = ioTs.TypeOf<typeof RolePermission>;

export const Role = ioTs.type({
  permissions: ioTs.array(RolePermission),
  roleId: ioTs.string,
  roleName: ioTs.string,
  isWildcard: ioTs.boolean,
  adminRole: ioTs.boolean,
});
export type Role = ioTs.TypeOf<typeof Role>;

const RoleWithManager = ioTs.intersection([
  Role,
  ioTs.type({
    managers: ioTs.array(RoleUser),
  }),
]);
export type RoleWithManager = ioTs.TypeOf<typeof RoleWithManager>;

export const RoleWithManagersResponse = ResponseBodyWithPagination(ioTs.array(RoleWithManager));
export type RoleWithManagersResponse = ioTs.TypeOf<typeof RoleWithManagersResponse>;

export const NamespaceRole = ioTs.type({
  roleId: ioTs.string,
  namespace: ioTs.string,
});
export type NamespaceRole = ioTs.TypeOf<typeof NamespaceRole>;

export interface NamespaceRoleWithPermission extends NamespaceRole {
  permissions: RolePermission[];
}

export class RoleDecodeError extends DecodeError {}
