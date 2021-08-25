/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Route, RouteProps, useRouteMatch } from "react-router-dom";
import { appendSlashToStringStart, combinePaths } from "../utils/url";

interface PrivateRouteProps extends RouteProps {
  path: string;
}

export const PrivateRoute = ({ path, ...props }: PrivateRouteProps) => {
  const { path: parentPath } = useRouteMatch();
  const combinedPaths = appendSlashToStringStart(combinePaths(parentPath, path));

  return <Route {...props} path={combinedPaths} />;
};
