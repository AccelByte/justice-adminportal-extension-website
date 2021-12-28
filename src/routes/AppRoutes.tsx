/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { ErrorRoutes } from "./ErrorRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { sendMessageToParentWindow } from "~/utils/iframe";
import { MessageType } from "~/models/iframe";

export const AppRoutes = () => {
  const location = useLocation();

  React.useEffect(() => {
    sendMessageToParentWindow({ message: { messageType: MessageType.locationChange, data: location } });
  }, [location.pathname, location.search]);

  return (
    <Switch>
      <Route path="/namespaces/:namespace" component={PrivateRoutes} />
      <ErrorRoutes />
    </Switch>
  );
};
