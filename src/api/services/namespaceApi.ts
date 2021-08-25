/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import networkManager from "../networkManager";
import { Namespace } from "../basic/models/namespace";
import { fetchNamespaces } from "../basic/namespace";

export class NamespaceApi {
  getNamespaces = async (): Promise<Namespace[]> => {
    const network = networkManager.withCredentials();

    return fetchNamespaces(network)
      .then((result) => {
        if (result.error) throw result.error;
        return result.response.data;
      })
      .catch((error) => {
        throw error;
      });
  };
}

const namespaceApi = new NamespaceApi();
export default namespaceApi;
