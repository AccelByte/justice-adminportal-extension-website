/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export interface FetchDataSchema<T> {
  isFetching: boolean;
  data: T | null;
  error: Error | null;
}

export interface ProcessingDataSchema {
  isProcessing: boolean;
  error: Error | null;
}
