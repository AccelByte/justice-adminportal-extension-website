/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { default as Collapsible } from "react-collapsible";
import * as React from "react";
import networkManager from "~/api/networkManager";
import "./ExtensionSidebarItemGroup.scss";
import { fetchExtensionManifest } from "~/api/misc/extension";
import { ExtensionManifest } from "~/api/misc/models/extension";
import { Spinner } from "justice-ui-library";
import { getCurrentLanguage, t } from "~/utils/i18n/i18n";
import { appendSlashToStringStart, combinePaths } from "~/utils/url";
import { useExtensionPermissionGuard, AdminUser as CommonUtilsAdminUser } from "justice-js-common-utils";
import userSessionApi from "../../api/services/userSessionApi";
import { SidebarNavLink } from "./SidebarNavLinks";
import { SidebarCollapsibleTrigger } from "./SidebarCollapsibleTrigger";

export const isTabRouteActive = (url: string, path: string) => {
  const adaptPath = path.slice(0, -1);
  const currentUrl = url.slice(0, adaptPath.length);
  return currentUrl === adaptPath;
};

interface ItemMenuProps {
  icon: string;
  itemTitle: React.ReactNode;
  isEarlyAccess?: boolean;
}

export const ItemMenu = ({ icon, itemTitle, isEarlyAccess }: ItemMenuProps) => {
  return (
    <div className="sidebar-item-menu-wrapper">
      <div>
        <i className={icon} />
        <span>{itemTitle}</span>
      </div>
      {isEarlyAccess && <div className="early-access-text">{t("nav.earlyAccess")}</div>}
    </div>
  );
};

const ExtensionSidebarItemGroup = ({ namespace }: { namespace: string }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [extension, setExtension] = React.useState<ExtensionManifest | null>(null);
  const user = userSessionApi.getUserData();
  const { isModuleShown, isSubmoduleShown } = useExtensionPermissionGuard({
    currentNamespace: namespace,
    user: user as CommonUtilsAdminUser,
  });

  React.useEffect(() => {
    if (isLoading) return;

    setIsLoading(true);
    const network = networkManager.withCredentials();
    fetchExtensionManifest(network)
      .then((result) => {
        if (result.error) throw result.error;
        setExtension(result.response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="extension-sidebar">
      {isLoading && <Spinner />}
      <Collapsible
        trigger={<SidebarCollapsibleTrigger parentNav={true} text={t("nav.group.extension")} />}
        openedClassName={"nav-tab opened"}
        className={"nav-tab"}
        open={true}
      >
        {extension &&
          extension.modules.map((module, index) => {
            const isNoSubModule = module.subModules.length === 0;
            if (isNoSubModule) {
              const path = combinePaths("extensions", module.id);
              return (
                module.isEnabled && (
                  <SidebarNavLink
                    activeClassName="active"
                    tooltip={module.title[getCurrentLanguage()]}
                    to={{ pathname: path }}
                  >
                    <ItemMenu icon={module.icon} itemTitle={module.title[getCurrentLanguage()]} />
                  </SidebarNavLink>
                )
              );
            }

            return (
              isModuleShown(module) && (
                <Collapsible
                  key={`${module.id}-${index}`}
                  trigger={<SidebarCollapsibleTrigger icon={module.icon} text={module.title[getCurrentLanguage()]} />}
                  open={true}
                  className={`nav-menu-group unlocked`}
                  openedClassName={`nav-menu-group unlocked`}
                >
                  {module.subModules.map((subModule, index) => {
                    const path = appendSlashToStringStart(combinePaths("namespaces", namespace, subModule.id));
                    return (
                      isSubmoduleShown(subModule) && (
                        <SidebarNavLink
                          key={`${subModule}-${index}`}
                          className={"nav-sub-link"}
                          activeClassName="active"
                          to={{ pathname: path }}
                          isActive={(match, location) => isTabRouteActive(location.pathname, path)}
                        >
                          <span>{subModule.title[getCurrentLanguage()]}</span>
                        </SidebarNavLink>
                      )
                    );
                  })}
                </Collapsible>
              )
            );
          })}
      </Collapsible>
    </div>
  );
};

export default ExtensionSidebarItemGroup;
