/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import { ExamplePage } from "../pages/ExamplePage";
import { AllowedNamespaceGuard } from "~/components/AllowedNamespaceGuard/AllowedNamespaceGuard";
import submodule from "../submodule.json";

export const SubmoduleRoutes = () => {
  return (
    <AllowedNamespaceGuard subModule={submodule}>
      <Switch>
        <Route path="/" component={ExamplePage} />
      </Switch>
    </AllowedNamespaceGuard>
  );
};
