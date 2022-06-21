/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react"
import SimpleBar from "simplebar-react";
import ExtensionSidebarItemGroup from "./SidebarItems";
import "./Nav.scss";
import "simplebar/dist/simplebar.min.css";
import { SelectOption, ValidSelect } from "justice-ui-library";
import { combinePaths, findParamsFromPath } from "~/utils/url";
import { history } from "~/utils/history";
import { t } from "~/utils/i18n/i18n";
import namespaceApi from "~/api/services/namespaceApi";
import { globalVar } from "~/constants/env";

const Nav: React.FC = () => {
  const [namespaces, setNamespaces] = React.useState<SelectOption[]>([])
  const urlNamespace = findParamsFromPath(window.location.toString(), "namespaces")
  const [namespace, setNamespace] = React.useState<SelectOption>({label: urlNamespace, value: urlNamespace})
  const handleChangeNamespace = (option: SelectOption) => {
    setNamespace(option)
  }
  React.useEffect(() => {
    history.push(`/${combinePaths("namespaces", namespace.value)}`)
  }, [namespace])
  React.useEffect(() => {
    namespaceApi.getNamespaces().then(result => {
      const namespaces = result.map(item => ({label: item.displayName, value: item.namespace}))
      const publisher = namespaces.find(item => item.value === globalVar.JUSTICE_PUBLISHER_NAMESPACE)
      const filteredNamespaces = namespaces.filter(item => item.value !== globalVar.JUSTICE_PUBLISHER_NAMESPACE)
      setNamespaces([publisher!, ...filteredNamespaces])
    })
  }, [])
  return (
    <div
      className="nav-panel"
    >
      <div className="navigation-top">
      <div className="namespace-selector">
        <div className="title">{t("namespaces.namespace").toLocaleUpperCase()}</div>
        <div className="react-select-namespace-container">
          <ValidSelect options={namespaces} placeholder="" value={namespace} onChange={handleChangeNamespace} />
        </div>
      </div>
      </div>
      <SimpleBar style={{ maxHeight: "calc(100vh - 171px)", display: "inherit" }}>
        <div className="links nav-links">
          <ExtensionSidebarItemGroup namespace={namespace.value}/>
        </div>
      </SimpleBar>
    </div>
  );
}

export default Nav