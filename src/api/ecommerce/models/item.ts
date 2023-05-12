/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError, ResponseBodyWithPagination } from "../../types";

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `RegionDataItem` from `@accelbyte/sdk` instead.
 */
export const RegionDataItem = ioTs.intersection([
  ioTs.type({
    currencyCode: ioTs.string,
    currencyNamespace: ioTs.string,
    price: ioTs.number,
  }),
  ioTs.partial({
    currencyType: ioTs.string,
    discountPercentage: ioTs.number,
    discountAmount: ioTs.number,
    discountedPrice: ioTs.number,
    purchaseAt: ioTs.string,
    expireAt: ioTs.string,
    discountPurchaseAt: ioTs.string,
    discountExpireAt: ioTs.string,
    trialPrice: ioTs.number,
  }),
]);

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `RegionDataItem` from `@accelbyte/sdk` instead.
 */
export type RegionDataItem = ioTs.TypeOf<typeof RegionDataItem>;

export const RegionData = ioTs.record(ioTs.string, ioTs.array(RegionDataItem));
export type RegionData = ioTs.TypeOf<typeof RegionData>;

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Images` from `@accelbyte/sdk` instead.
 */
export const ItemImage = ioTs.intersection([
  ioTs.type({
    height: ioTs.number,
    width: ioTs.number,
    imageUrl: ioTs.string,
    smallImageUrl: ioTs.string,
  }),
  ioTs.partial({
    as: ioTs.string,
    caption: ioTs.string,
  }),
]);

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Images` from `@accelbyte/sdk` instead.
 */
export type ItemImage = ioTs.TypeOf<typeof ItemImage>;

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Localization` from `@accelbyte/sdk` instead.
 */
export const ItemLocalizationItem = ioTs.intersection([
  ioTs.type({
    title: ioTs.string,
  }),
  ioTs.partial({
    description: ioTs.string,
    longDescription: ioTs.string,
  }),
]);

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Localization` from `@accelbyte/sdk` instead.
 */
export type ItemLocalizationItem = ioTs.TypeOf<typeof ItemLocalizationItem>;

export const ItemLocalization = ioTs.record(ioTs.string, ItemLocalizationItem);
export type ItemLocalization = ioTs.TypeOf<typeof ItemLocalization>;

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Recurring` from `@accelbyte/sdk` instead.
 */
export const ItemRecurring = ioTs.type({
  cycle: ioTs.string,
  fixedFreeDays: ioTs.number,
  fixedTrialCycles: ioTs.number,
  graceDays: ioTs.number,
});

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `Recurring` from `@accelbyte/sdk` instead.
 */
export type ItemRecurring = ioTs.TypeOf<typeof ItemRecurring>;

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `FullItemInfo` from `@accelbyte/sdk` instead.
 */
export const Item = ioTs.intersection([
  ioTs.type({
    categoryPath: ioTs.string,
    createdAt: ioTs.string,
    entitlementType: ioTs.string,
    itemId: ioTs.string,
    itemType: ioTs.string,
    name: ioTs.string,
    namespace: ioTs.string,
    status: ioTs.string,
    updatedAt: ioTs.string,
  }),
  ioTs.partial({
    useCount: ioTs.number,
    appId: ioTs.string,
    appType: ioTs.string,
    sku: ioTs.string,
    images: ioTs.array(ItemImage),
    displayOrder: ioTs.number,
    stackable: ioTs.boolean,
    baseAppId: ioTs.string,
    localizations: ItemLocalization,
    regionData: RegionData,
    itemIds: ioTs.array(ioTs.string),
    bundleItems: ioTs.array(ioTs.unknown),
    lootBoxItems: ioTs.array(ioTs.unknown),
    tags: ioTs.array(ioTs.string),
    maxCount: ioTs.number,
    maxCountPerUser: ioTs.number,
    title: ioTs.string,
    targetNamespace: ioTs.string,
    targetItemId: ioTs.string,
    targetCurrencyCode: ioTs.string,
    boothName: ioTs.string,
    recurring: ItemRecurring,
    features: ioTs.array(ioTs.string),
    seasonType: ioTs.string,
  }),
]);

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `FullItemInfo` from `@accelbyte/sdk` instead.
 */
export type Item = ioTs.TypeOf<typeof Item>;

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `FullItemPagingSlicedResult` from `@accelbyte/sdk` instead.
 */
export const ItemResponse = ResponseBodyWithPagination(ioTs.array(Item));

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `FullItemPagingSlicedResult` from `@accelbyte/sdk` instead.
 */
export type ItemResponse = ioTs.TypeOf<typeof ItemResponse>;

export class ItemDecodeError extends DecodeError {}
