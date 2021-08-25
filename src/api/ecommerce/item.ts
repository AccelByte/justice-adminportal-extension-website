/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { ItemDecodeError, ItemResponse } from "./models/item";
import { Network } from "../networkManager";
import { guardNetworkCall } from "../networkCallTypeguard";

export interface FetchItemsByCriteriaParams {
  offset?: number;
  limit?: number;
}

export async function fetchItemsByCriteria(
  network: Network,
  params: { namespace: string; fetchParams?: FetchItemsByCriteriaParams }
) {
  return guardNetworkCall(
    () =>
      network.get(`/platform/admin/namespaces/${params.namespace}/items/byCriteria`, { params: params.fetchParams }),
    ItemResponse,
    ItemDecodeError,
    (error) => error
  );
}
