/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { AdminUser } from "../iam/models/user";
import extendedStorage from "../../utils/storage";
import userSessionEvent from "../../app-messages/event/userSessionEvent";
import userApi from "./userApi";
import roleApi from "./roleApi";
import { NamespaceRole } from "../iam/models/role";
import {
  getAdminNamespaceRoles,
  getAdminRoles,
  getCurrentUserNamespacedPermissions,
  getCurrentUserPermissions,
  getCurrentUserRoles,
  getRoleIdsByNamespace,
  isUserHasAdminRole,
} from "justice-js-common-utils";

export const PERSIST_USER_DATA_KEY = "user";

class UserSessionApi {
  init = async (currentNamespace?: string) => {
    try {
      const user = await userApi.getCurrentUser();
      const roles = await roleApi.getRoles();

      // If user doesn't have admin role, then show error
      const userNamespaceRoleIds = (user.namespaceRoles || []).map((role: NamespaceRole) => role.roleId);
      if (!isUserHasAdminRole(userNamespaceRoleIds, getAdminRoles(roles))) throw new Error();

      // Find user's roles for selected namespace (include namespace with wildcard sign)
      const userRoleIdsByNamespace = getRoleIdsByNamespace(user.namespaceRoles || [], currentNamespace);
      // Get current user permission list from current user's roles
      const currentUserRoles = getCurrentUserRoles(roles, userRoleIdsByNamespace);
      const currentUserPermissions = getCurrentUserPermissions(currentUserRoles);

      // Get current user permission with namespace list from current user's namespace roles
      const namespaceRoleWithPermission = await roleApi.getNamespaceRolePermission(user);
      const namespaceRolePermission = getCurrentUserNamespacedPermissions(namespaceRoleWithPermission);

      // Persist user and permission data
      const currentUser = {
        ...user,
        namespaceRoles: getAdminNamespaceRoles(user.namespaceRoles || [], roles),
        permissions: [...currentUserPermissions, ...namespaceRolePermission],
      };
      this.persistUserData(currentUser);
      userSessionEvent.userLoaded(currentUser);
    } catch (error) {
      console.error(error);
      userSessionEvent.userError(error as Error);
      this.clearUserData();
    }
  };

  isUserDataExist = () => {
    return !!extendedStorage(true).localStorage.getObject(PERSIST_USER_DATA_KEY);
  };

  shouldRefresh = async () => {
    if (!this.isUserDataExist()) return true;

    try {
      const user = await userApi.getCurrentUser();

      return user.userId !== this.getUserData().userId || user.namespaceRoles !== this.getUserData().namespaceRoles;
    } catch (error) {
      return true;
    }
  };

  persistUserData = (user: AdminUser) => {
    extendedStorage(true).localStorage.setObject(PERSIST_USER_DATA_KEY, user);
  };

  getUserData = () => {
    try {
      const data = extendedStorage(true).localStorage.getObject(PERSIST_USER_DATA_KEY);
      return data;
    } catch (e) {
      return null;
    }
  };

  clearUserData = () => {
    localStorage.removeItem(PERSIST_USER_DATA_KEY);
  };
}

const userSession = new UserSessionApi();
export default userSession;
