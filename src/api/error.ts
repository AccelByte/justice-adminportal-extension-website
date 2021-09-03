/*
 * Copyright (c) 2019. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as ioTs from "io-ts";

export const ServiceError = ioTs.type({
  errorCode: ioTs.number,
  errorMessage: ioTs.string,
});

export type ServiceError = ioTs.TypeOf<typeof ServiceError>;

export class DecodeError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DecodeError.prototype);
  }
}
