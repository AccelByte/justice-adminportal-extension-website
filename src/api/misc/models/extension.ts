/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
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

export const APIExtensionSubModule = ioTs.intersection([
  ioTs.type({
    id: ioTs.string,
    title: ioTs.record(ioTs.string, ioTs.string),
    isEnabled: ioTs.boolean,
    permission: RolePermission,
  }),
  ioTs.partial({
    allowedNamespaces: ioTs.array(ioTs.string),
  }),
]);
export type APIExtensionSubModule = ioTs.TypeOf<typeof APIExtensionSubModule>;

export const ExtensionModule = ioTs.intersection([
  ioTs.type({
    id: ioTs.string,
    title: ioTs.record(ioTs.string, ioTs.string),
    icon: ioTs.string,
    isEnabled: ioTs.boolean,
    subModules: ioTs.array(APIExtensionSubModule),
  }),
  ioTs.partial({
    permission: RolePermission,
  }),
]);
export type ExtensionModule = ioTs.TypeOf<typeof ExtensionModule>;

export const ExtensionManifest = ioTs.type({
  name: ioTs.string,
  author: ioTs.string,
  modules: ioTs.array(ExtensionModule),
});
export type ExtensionManifest = ioTs.TypeOf<typeof ExtensionManifest>;

export class ExtensionManifestDecodeError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, ExtensionManifestDecodeError.prototype);
  }
}
