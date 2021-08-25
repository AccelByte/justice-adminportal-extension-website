/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { StoresPage } from "../components/StoresPage";
import { ItemsPage } from "../components/ItemsPage";

export const Submodule2Routes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={StoresPage} />
      <Route path={`${path}/:storeId/items`} exact component={ItemsPage} />
    </Switch>
  );
};
