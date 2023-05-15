/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError } from "../../types";

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `NamespaceInfo` from `@accelbyte/sdk` instead.
 */
export const Namespace = ioTs.type({
  namespace: ioTs.string,
  displayName: ioTs.string,
  status: ioTs.string,
  createdAt: ioTs.string,
  updatedAt: ioTs.string,
});

/**
 * @deprecated this is for old extension features thich still use io-ts.
 * Please use `NamespaceInfo` from `@accelbyte/sdk` instead.
 */
export type Namespace = ioTs.TypeOf<typeof Namespace>;

export class NamespaceDecodeError extends DecodeError {}
