/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { PrivateRoute } from "./PrivateRoute";
import { SubmoduleRoutes } from "../packages/Module/Submodule/routes/SubmoduleRoutes";
import { Submodule2Routes } from "../packages/Module/Submodule2/routes/Submodule2Routes";

export const PrivateRoutes = () => {
  return (
    <div className="main">
      <PrivateRoute path={"/example-1-submodule"} component={SubmoduleRoutes} />
      <PrivateRoute path={"/example-2-submodule"} component={Submodule2Routes} />
    </div>
  );
};
