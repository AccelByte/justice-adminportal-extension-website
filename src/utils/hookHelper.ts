/*
 *
 *  * Copyright (c) 2018-2019 AccelByte Inc. All Rights Reserved.
 *  * This is licensed software from AccelByte Inc, for limitations
 *  * and restrictions contact your company contract manager.
 *
 */

import { DependencyList, useEffect, useState, useCallback } from "react";

export const useEffectAsync = (effect: Function, deps?: DependencyList) => {
  useEffect(() => {
    effect();
  }, deps);
};

export const useRefresh = () => {
  const [, dispatch] = useState<{}>(Object.create(null));

  return useCallback((): void => {
    dispatch(Object.create(null));
  }, [dispatch]);
};
