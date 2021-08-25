/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { history } from "./utils/history";
import { AppProvider } from "./app-states/AppProvider/AppProvider";
import "./styles/index.scss";

function App() {
  return (
    <Router history={history}>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;
