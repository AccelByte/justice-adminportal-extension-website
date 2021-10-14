/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import initialUserFetcher from "./initUserSession";
import initUnAuthorizedHandler from "./initUnAuthorizedHandler";

export interface TaskParams {
  namespace: string;
}

type Task = (params: TaskParams) => Promise<void> | void;
const tasks: Task[] = [initUnAuthorizedHandler, initialUserFetcher];

export default async (params: TaskParams) => {
  return await tasks.reduce(async (promise, task) => {
    await promise;
    await task(params);
  }, Promise.resolve());
};
