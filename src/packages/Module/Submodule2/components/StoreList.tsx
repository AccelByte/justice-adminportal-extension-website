/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Button, DynamicTable } from "justice-ui-library";
import React from "react";
import { t } from "../../../../utils/i18n/i18n";
import { Store } from "~/api/ecommerce/models/store";

interface Props {
  stores: Store[];
  onView: (store: Store) => void;
}

function getTableHead() {
  return {
    cells: [
      {
        key: "storeId",
        content: t("example.module.subModule2.storesPage.stores.id"),
      },
      {
        key: "title",
        content: t("example.module.subModule2.storesPage.stores.name"),
      },
      {
        key: "defaultRegion",
        content: t("example.module.subModule2.storesPage.stores.defaultRegion"),
      },
      {
        key: "action",
        content: t("common.action"),
      },
    ],
  };
}

function getTableContent(stores: Store[], onView: (store: Store) => void) {
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
          <Button appearance={"link"} onClick={() => onView(store)}>
            View
          </Button>
        ),
      },
    ],
  }));
}

const StoreList = ({ stores, onView }: Props) => {
  return (
    <DynamicTable
      head={getTableHead()}
      rows={getTableContent(
        stores.filter((store) => store.published),
        onView
      )}
    />
  );
};

export default StoreList;
