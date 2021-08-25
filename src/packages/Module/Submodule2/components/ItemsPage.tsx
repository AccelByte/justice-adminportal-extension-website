/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Card, DynamicTable, LoadingOrErrorWrapper, Page, Pagination } from "justice-ui-library";
import classNames from "classnames";
import { RequestType } from "../../../../api/types";
import { Item, ItemResponse } from "../../../../api/ecommerce/models/item";
import networkManager from "../../../../api/networkManager";
import { fetchItemsByCriteria, FetchItemsByCriteriaParams } from "../../../../api/ecommerce/item";
import { parse } from "query-string";

function getTableHead() {
  return {
    cells: [
      {
        key: "itemId",
        content: "ID",
      },
      {
        key: "name",
        content: "Name",
      },
      {
        key: "itemType",
        content: "ItemType",
      },
    ],
  };
}

function getTableContent(items: Item[]) {
  return items.map((item, index) => ({
    key: `row-${index}-${item.itemId}`,
    cells: [
      {
        key: `${index}-${item.itemId}-id`,
        content: item.itemId,
      },
      {
        key: `${index}-${item.name}-name`,
        content: item.name,
      },
      {
        key: `${index}-${item.itemType}-itemType`,
        content: item.itemType,
      },
    ],
  }));
}

export const ItemsPage = () => {
  const history = useHistory();
  const { pathname, search } = useLocation();
  const [items, setItems] = React.useState<RequestType<ItemResponse | null>>({
    data: null,
    isLoading: false,
    error: null,
  });
  const { namespace } = useParams<{ namespace: string }>();

  const getItems = async (fetchParams?: FetchItemsByCriteriaParams) => {
    setItems({ data: null, error: null, isLoading: true });
    const network = networkManager.withCredentials();
    fetchItemsByCriteria(network, { namespace, fetchParams })
      .then((res) => {
        if (res.error) throw res.error;
        setItems({ data: res.response.data, error: null, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
        setItems({ error: err, data: null, isLoading: false });
      });
  };

  const onChangePage = async (paging?: string) => {
    if (!paging) return;
    const url = new URL(paging);
    const searchParams = new URLSearchParams();
    searchParams.set("offset", url.searchParams.get("offset") || "0");
    searchParams.set("limit", url.searchParams.get("limit") || "10");

    history.push(`${pathname}?${searchParams.toString()}`);
  };

  React.useEffect(() => {
    const { offset, limit } = parse(search);
    getItems({ offset: Number(offset) || 0, limit: Number(limit) || 10 });
  }, [pathname, search]);

  return (
    <Page title={"Items"}>
      <Card cardTitle={"Items"} noHorizontalMargin noPadding>
        <div className={classNames({ "mt-5": items.isLoading })}>
          <LoadingOrErrorWrapper isLoading={items.isLoading} error={items.error} errorTitle={"Unable to show data"}>
            {items.data && (
              <>
                <DynamicTable head={getTableHead()} rows={getTableContent(items.data.data)} />
                <Pagination paging={items.data.paging} changePage={onChangePage} />
              </>
            )}
          </LoadingOrErrorWrapper>
        </div>
      </Card>
    </Page>
  );
};
