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
import { guardSendAndReceiveMessage } from "./utils/iframe";
import { GetSharedEnvar } from "./models/parentMessage";
import { MessageType } from "./models/iframe";
import { globalVar } from "./constants/env";

const Nav = React.lazy(() => import("./components/Nav/Nav"));

const getSharedEnvar = async () => {
  const result = await guardSendAndReceiveMessage({
    messageToBeSent: { message: { messageType: MessageType.getSharedEnvar } },
    timeoutMs: 1000,
    Codec: GetSharedEnvar,
  });
  let sharedEnvar: any = null
  try {
    sharedEnvar = JSON.parse(result);
  } catch(e) {
    return
  }
  if (!sharedEnvar) return;

  Object.keys(sharedEnvar).map((key: any) => {
    const envKey: keyof typeof globalVar = key;
    if (!globalVar[envKey]) {
      globalVar[envKey] = sharedEnvar[envKey];
    }
  });
};

function App() {
  const showSidebarDev = process.env.NODE_ENV === "development" && !isInIframe();
  React.useEffect(() => {
    getSharedEnvar();
  }, [])
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
