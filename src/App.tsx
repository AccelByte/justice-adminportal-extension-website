/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { history } from "./utils/history";
import { AppProvider } from "./app-states/AppProvider/AppProvider";
import "./styles/index.scss";
import classNames from "classnames";
import { isInIframe } from "./utils/browserIframeSwitch";
import { LoadingIndicator } from "justice-ui-library";

const Nav = React.lazy(() => import("./components/Nav/Nav"));

function App() {
  const showSidebarDev = process.env.NODE_ENV === "development" && !isInIframe();
  return (
    <Router history={history}>
      <AppProvider>
        <div className={classNames("app", { "with-sidebar": showSidebarDev })}>
          {showSidebarDev && (
            <React.Suspense fallback={<LoadingIndicator />}>
              <Nav />
            </React.Suspense>
          )}
          <AppRoutes />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
