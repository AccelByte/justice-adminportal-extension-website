/*
 * Copyright (c) 2019-2023. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { z } from "zod";

export const ServiceError = z.object({
  errorCode: z.number(),
  errorMessage: z.string(),
});

export type ServiceError = z.TypeOf<typeof ServiceError>;

export class DecodeError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, DecodeError.prototype);
  }
}
