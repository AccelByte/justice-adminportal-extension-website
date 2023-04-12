/*
 * Copyright (c) 2021-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { z } from "zod";
import * as ioTs from "io-ts";

export type UnionFromTuple<T> = T extends (infer U)[] ? U : never;

export const Enum = <T extends string[]>(...args: T) => {
  return Object.freeze(
    args.reduce((acc, next) => {
      return {
        ...acc,
        [next]: next,
      };
    }, Object.create(null)) as { [P in UnionFromTuple<typeof args>]: P }
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Enum<T extends object> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/ban-types
export const isKeyOfEnum = <T extends object>(key: unknown, enumType: T): key is keyof T => {
  return !!Object.values(enumType).find((value) => value === key);
};

export type RequestType<T> = { data: T; isLoading: boolean; error: Error | null };

const Paging = ioTs.partial({
  first: ioTs.string,
  last: ioTs.string,
  next: ioTs.string,
  previous: ioTs.string,
});
export type Paging = ioTs.TypeOf<typeof Paging>;

const ZodPaging = z
  .object({
    first: z.string(),
    last: z.string(),
    next: z.string(),
    previous: z.string(),
  })
  .partial();
export type ZodPaging = z.TypeOf<typeof ZodPaging>;

export const ResponseBodyWithPagination = <C extends ioTs.Mixed>(dataCodec: C) =>
  ioTs.intersection([
    ioTs.interface({
      data: dataCodec,
      paging: Paging,
    }),
    ioTs.partial({
      totalData: ioTs.number,
      total: ioTs.number,
    }),
  ]);

export const ZodResponseBodyWithPagination = <C extends z.ZodTypeAny>(dataCodec: C) =>
  z.intersection(
    z.object({
      data: dataCodec,
      paging: ZodPaging,
    }),
    z
      .object({
        totalData: z.number(),
        total: z.number(),
      })
      .partial()
  );

export type ResponseBodyWithPagination<T> = {
  data: T;
  paging: Paging;
  totalData?: number;
  total?: number;
};

export class DecodeError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, DecodeError.prototype);
  }
}
