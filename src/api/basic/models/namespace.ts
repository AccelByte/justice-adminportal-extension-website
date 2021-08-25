/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";
import { DecodeError } from "../../types";

export const Namespace = ioTs.type({
  namespace: ioTs.string,
  displayName: ioTs.string,
  status: ioTs.string,
  createdAt: ioTs.string,
  updatedAt: ioTs.string,
});
export type Namespace = ioTs.TypeOf<typeof Namespace>;

export class NamespaceDecodeError extends DecodeError {}
