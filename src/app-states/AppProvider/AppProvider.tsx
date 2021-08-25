/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { RequestType } from "../../api/types";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import userEvent from "../../app-messages/event/userSessionEvent";
import { findParamsFromPath } from "../../utils/url";
import { AdminUser } from "../../api/iam/models/user";
import userSessionApi from "../../api/services/userSessionApi";
import { LoadingIndicator } from "justice-ui-library";

interface AppContextType {
  app: RequestType<boolean>;
  user: AdminUser | null;
}

const AppContext = React.createContext<AppContextType>({} as AppContextType);

export function AppProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { pathname } = useLocation();
  const history = useHistory();

  const [app, setApp] = React.useState<RequestType<boolean>>({ data: false, isLoading: false, error: null });
  const [user, setUser] = React.useState<AdminUser | null>(userSessionApi.getUserData());

  const initializeApp = async () => {
    if (app.isLoading) return;
    setApp({ data: false, isLoading: true, error: null });

    await Promise.all([
      await import("../../app-tasks")
        .then((module) => module.default)
        .then((taskRunner) =>
          taskRunner({
            namespace: findParamsFromPath(pathname, "namespaces"),
          })
        ),
    ]).then(() => setApp({ data: true, isLoading: false, error: null }));
  };

  const onInitError = (error: Error) => {
    setApp({ data: false, isLoading: false, error: error });
    history.replace("/oops", { error });
  };

  React.useEffect(() => {
    initializeApp();
  }, []);

  React.useEffect(() => {
    userEvent.subscribe("userError", onInitError);
    userEvent.subscribe("userLoaded", setUser);

    return () => {
      userEvent.unsubscribe("userError", onInitError);
      userEvent.unsubscribe("userLoaded", setUser);
    };
  }, []);

  const getContextValue = React.useMemo((): AppContextType => ({ app, user }), [app, setApp, user, setUser]);

  if (app.isLoading || !app.data) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <LoadingIndicator />
      </div>
    );
  }

  return <AppContext.Provider value={getContextValue}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return React.useContext(AppContext);
}
