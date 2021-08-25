/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import userSession from "../api/services/userSessionApi";
import { TaskParams } from "./index";
import userSessionApi from "../api/services/userSessionApi";

let initialFetchDone = false;
export default async (params: TaskParams) => {
  if (!initialFetchDone) {
    initialFetchDone = true;
    const shouldRefresh = await userSessionApi.shouldRefresh();

    if (!userSession.isUserDataExist() || shouldRefresh) {
      await userSession.init(params.namespace);
    }
  }
};
