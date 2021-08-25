/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as React from "react";
import { Route } from "react-router-dom";
import { OopsErrorPage } from "../components/Error/OopsErrorPage";

export const ErrorRoutes = () => {
  return (
    <>
      <Route path="/oops" exact component={OopsErrorPage} />
    </>
  );
};
