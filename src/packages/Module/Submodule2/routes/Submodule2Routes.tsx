/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { StoresPage } from "../pages/StoresPage";
import { ItemsPage } from "../pages/ItemsPage";
import { AllowedNamespaceGuard } from "../../../../components/AllowedNamespaceGuard/AllowedNamespaceGuard";
import subModule from "../submodule.json";

export const Submodule2Routes = () => {
  const { path } = useRouteMatch();

  return (
    <AllowedNamespaceGuard subModule={subModule}>
      <Switch>
        <Route path={path} exact component={StoresPage} />
        <Route path={`${path}/:storeId/items`} exact component={ItemsPage} />
      </Switch>
    </AllowedNamespaceGuard>
  );
};
