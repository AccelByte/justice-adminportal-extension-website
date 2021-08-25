/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import networkManager from "../networkManager";
import { fetchCurrentUser } from "../iam/user";
import { AdminUser } from "../iam/models/user";

class UserApi {
  getCurrentUser = async (): Promise<AdminUser> => {
    const network = networkManager.withCredentials();

    return fetchCurrentUser(network)
      .then((result) => {
        if (result.error) throw result.error;
        return result.response.data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

const userApi = new UserApi();
export default userApi;
