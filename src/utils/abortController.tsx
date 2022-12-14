/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as React from "react";

export const createAbortController = (): AbortController => new AbortController();

export const useAbortController = () => {
  const controller = new AbortController();

  React.useEffect(() => () => controller.abort(), []);

  return { signal: controller.signal };
};

export const withAbortController = (Component: any) =>
  // eslint-disable-next-line react/display-name
  function (props: any) {
    const { signal } = useAbortController();
    return <Component {...props} signal={signal} />;
  };
