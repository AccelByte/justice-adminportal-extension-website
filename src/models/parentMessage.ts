/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "justice-ui-library";
import { z } from "zod";

// define parent message type
export const ParentMessageType = Enum("isRefreshSessionLock", "refreshWithLock");

export const ParentMessageData = z.intersection(
  z.object({
    data: z.any(),
    messageType: z.string(),
  }),
  z
    .object({
      channel: z.string(),
    })
    .partial()
);
export type ParentMessageData = z.TypeOf<typeof ParentMessageData>;

// define parent message data type
export const IsRefreshSessionLock = z.boolean();
export type IsRefreshSessionLock = z.TypeOf<typeof IsRefreshSessionLock>;

export const RefreshWithLock = z.boolean();
export type RefreshWithLock = z.TypeOf<typeof RefreshWithLock>;

export const GetSharedEnvar = z.string();
export type GetSharedEnvar = z.TypeOf<typeof GetSharedEnvar>;
