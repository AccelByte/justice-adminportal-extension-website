/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError } from "../../types";

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `StoreInfo` from `@accelbyte/sdk` instead.
 */
export const Store = ioTs.intersection([
  ioTs.type({
    storeId: ioTs.string,
    namespace: ioTs.string,
    title: ioTs.string,
    published: ioTs.boolean,
    defaultRegion: ioTs.string,
    defaultLanguage: ioTs.string,
    createdAt: ioTs.string,
    updatedAt: ioTs.string,
  }),
  ioTs.partial({
    description: ioTs.string,
    supportedLanguages: ioTs.array(ioTs.string),
    supportedRegions: ioTs.array(ioTs.string),
  }),
]);

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `StoreInfo` from `@accelbyte/sdk` instead.
 */
export type Store = ioTs.TypeOf<typeof Store>;

export class StoreDecodeError extends DecodeError {}
