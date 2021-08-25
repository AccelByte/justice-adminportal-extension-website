/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { Button, Card, DynamicTable, LoadingOrErrorWrapper, Page } from "justice-ui-library";
import networkManager from "../../../../api/networkManager";
import { RequestType } from "../../../../api/types";
import classNames from "classnames";
import { fetchStores } from "../../../../api/ecommerce/store";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Store } from "../../../../api/ecommerce/models/store";

function getTableHead() {
  return {
    cells: [
      {
        key: "storeId",
        content: "ID",
      },
      {
        key: "title",
        content: "Title",
      },
      {
        key: "defaultRegion",
        content: "Default Region",
      },
      {
        key: "action",
        content: "Action",
      },
    ],
  };
}

function getTableContent(stores: Store[], onView: (storeId: string) => void) {
  return stores.map((store, index) => ({
    key: `row-${index}-${store.storeId}`,
    cells: [
      {
        key: `${index}-${store.storeId}-id`,
        content: store.storeId,
      },
      {
        key: `${index}-${store.storeId}-title`,
        content: store.title,
      },
      {
        key: `${index}-${store.storeId}-defaultRegion`,
        content: store.defaultRegion,
      },
      {
        key: `${index}-${store.storeId}-action`,
        content: (
          <Button appearance={"link"} onClick={() => onView(store.storeId)}>
            View
          </Button>
        ),
      },
    ],
  }));
}

export const StoresPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { namespace } = useParams<{ namespace: string }>();
  const [stores, setStores] = React.useState<RequestType<Store[]>>({
    data: [],
    error: null,
    isLoading: false,
  });

  const onViewClick = (storeId: string) => {
    history.push(`${location.pathname}/${storeId}/items`);
  };

  React.useEffect(() => {
    setStores({ data: [], error: null, isLoading: true });
    const network = networkManager.withCredentials();
    fetchStores(network, namespace)
      .then((res) => {
        if (res.error) throw res.error;
        setStores({ data: res.response.data, error: null, isLoading: false });
      })
      .catch((err) => {
        console.error(err);
        setStores({ error: err, data: [], isLoading: false });
      });
  }, []);

  return (
    <Page title={"Stores"}>
      <Card cardTitle={"Published Store"} noHorizontalMargin noPadding>
        <div className={classNames({ "mt-5": stores.isLoading })}>
          <LoadingOrErrorWrapper isLoading={stores.isLoading} error={stores.error} errorTitle={"Unable to show data"}>
            <DynamicTable
              head={getTableHead()}
              rows={getTableContent(
                stores.data.filter((store) => store.published),
                onViewClick
              )}
            />
          </LoadingOrErrorWrapper>
        </div>
      </Card>
    </Page>
  );
};
