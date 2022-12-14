/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React, { Suspense } from "react";
import { PrivateRoute } from "./PrivateRoute";
import { SubmoduleRoutes } from "@packages/Module/Submodule/routes/SubmoduleRoutes";
import { Submodule2Routes } from "@packages/Module/Submodule2/routes/Submodule2Routes";
import { Loading } from "~/components/common-components";
import { t } from "~/utils/i18n/i18n";

export const PrivateRoutes = () => {
  return (
    <div className="main">
      <Suspense fallback={<Loading loadingInfo={t("loading.wait")} />}>
        <PrivateRoute path={"/example-1-submodule"} component={SubmoduleRoutes} />
        <PrivateRoute path={"/example-2-submodule"} component={Submodule2Routes} />
      </Suspense>
    </div>
  );
};
