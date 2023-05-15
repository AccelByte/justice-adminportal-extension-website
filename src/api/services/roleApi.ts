/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import networkManager from "../networkManager";
import { fetchRole, fetchRoles } from "../iam/role";
import { NamespaceRole, NamespaceRoleWithPermission, Role, RolePermission, RoleWithManager } from "../iam/models/role";
import { AdminUser } from "../iam/models/user";
import namespaceApi from "./namespaceApi";
import { Namespace } from "../basic/models/namespace";
import { replacePermissionNamespace, WILDCARD_SIGN } from "@accelbyte/validator";

export class RoleApi {
  getRoles = async (): Promise<RoleWithManager[]> => {
    const network = networkManager.withCredentials();

    return fetchRoles(network)
      .then((result) => {
        if (result.error) throw result.error;
        return result.response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  getNamespaceRolePermission = async (user: AdminUser): Promise<NamespaceRoleWithPermission[]> => {
    const namespaces = await namespaceApi.getNamespaces();

    const result: NamespaceRoleWithPermission[] = [];
    const namespacesRolesPermission = await this.getBulkNamespacesRolePermission(user.namespaceRoles || []);

    namespacesRolesPermission.map((namespaceRolePermission) => {
      if (namespaceRolePermission.namespace === WILDCARD_SIGN) {
        namespaces.map((namespace: Namespace) => {
          const permissions: RolePermission[] = namespaceRolePermission.permissions.map((permission) =>
            replacePermissionNamespace(permission, namespace.namespace)
          );
          result.push({
            permissions,
            roleId: namespaceRolePermission.roleId,
            namespace: namespace.namespace,
          });
        });
      } else {
        const permissions: RolePermission[] = namespaceRolePermission.permissions.map((permission) =>
          replacePermissionNamespace(permission, namespaceRolePermission.namespace)
        );
        result.push({
          ...namespaceRolePermission,
          permissions,
        });
      }
    });

    return result;
  };

  getBulkNamespacesRolePermission = async (namespaceRoles: NamespaceRole[]): Promise<NamespaceRoleWithPermission[]> => {
    if (namespaceRoles.length < 1) return [];

    return await Promise.all(
      namespaceRoles.map(async (namespaceRole): Promise<NamespaceRoleWithPermission> => {
        return this.getNamespacedRolePermission(namespaceRole.roleId)
          .then((response) => {
            return {
              ...namespaceRole,
              permissions: response.permissions,
            };
          })
          .catch((error) => {
            throw error;
          });
      })
    );
  };

  getNamespacedRolePermission = (roleId: string): Promise<Role> => {
    const network = networkManager.withCredentials();

    return fetchRole(network, { roleId }).then((result) => {
      if (result.error) throw result.error;
      return result.response.data;
    });
  };
}

const roleApi = new RoleApi();
export default roleApi;
