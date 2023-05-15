/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { DynamicTable } from "justice-ui-library";
import React from "react";
import { t } from "../../../../utils/i18n/i18n";
import { Item } from "~/api/ecommerce/models/item";

function getTableHead() {
  return {
    cells: [
      {
        key: "itemId",
        content: t("example.module.subModule2.itemsPage.items.id"),
      },
      {
        key: "name",
        content: t("example.module.subModule2.itemsPage.items.name"),
      },
      {
        key: "itemType",
        content: t("example.module.subModule2.itemsPage.items.itemType"),
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

interface Props {
  items: Item[];
}
const ItemList = ({ items }: Props) => <DynamicTable head={getTableHead()} rows={getTableContent(items)} />;

export default ItemList;
