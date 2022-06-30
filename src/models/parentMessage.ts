/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "justice-ui-library";
import * as ioTs from "io-ts";

// define parent message type
export const ParentMessageType = Enum("isRefreshSessionLock", "refreshWithLock");

export const ParentMessageData = ioTs.intersection([
  ioTs.partial({
    channel: ioTs.string,
  }),
  ioTs.type({
    data: ioTs.any,
    messageType: ioTs.string,
  }),
]);
export type ParentMessageData = ioTs.TypeOf<typeof ParentMessageData>;

// define parent message data type
export const IsRefreshSessionLock = ioTs.boolean;
export type IsRefreshSessionLock = ioTs.TypeOf<typeof IsRefreshSessionLock>;

export const RefreshWithLock = ioTs.boolean;
export type RefreshWithLock = ioTs.TypeOf<typeof RefreshWithLock>;

export const GetSharedEnvar = ioTs.string;
export type GetSharedEnvar = ioTs.TypeOf<typeof GetSharedEnvar>
