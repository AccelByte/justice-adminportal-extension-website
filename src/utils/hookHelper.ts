/*
 * Copyright (c) 2018-2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { DependencyList, useEffect, useState, useCallback, useReducer, Reducer } from "react";
import { FetchDataSchema, ProcessingDataSchema } from "~/models/common";

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

// use it when dealing with object state and later want to update some of its properties
// without having to spread the previous state
export function useSimpleReducer<T>(initialValue: T) {
  return useReducer<Reducer<T, Partial<T>>>((prevState, newState) => ({ ...prevState, ...newState }), initialValue);
}

export function useFetchDataSchema<Data>(
  defaultValue: FetchDataSchema<Data> = {
    isFetching: false,
    data: null,
    error: null,
  }
) {
  return useSimpleReducer<FetchDataSchema<Data>>(defaultValue);
}

export function useProcessingDataSchema(
  defaultValue: ProcessingDataSchema = {
    isProcessing: false,
    error: null,
  }
) {
  return useSimpleReducer<ProcessingDataSchema>(defaultValue);
}
