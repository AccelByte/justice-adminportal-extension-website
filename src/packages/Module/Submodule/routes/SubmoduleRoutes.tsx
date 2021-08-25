/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import { ExamplePage } from "../components/ExamplePage";

export const SubmoduleRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={ExamplePage} />
    </Switch>
  );
};
