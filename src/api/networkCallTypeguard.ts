/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { AxiosResponse } from "axios";
import * as ioTs from "io-ts";
import { reporter } from "io-ts-reporters";
import { wrapNetworkCall } from "./networkCallWrapper";

function guardResponseType<A>(res: AxiosResponse<unknown>, Codec: ioTs.Type<A>): res is AxiosResponse<A> {
  return Codec.is(res.data);
}

function getCodecErrorReport<A>(res: AxiosResponse<unknown>, Codec: ioTs.Type<A>) {
  return reporter(Codec.decode(res.data));
}

/**
 * @deprecated This function is kept for old features. Please use `Validate` from `@accelbyte/sdk` instead.
 */
export function guardNetworkCall<ResponseDataType, ErrorType, DecodeErrorType extends Error>(
  networkCallFunction: () => Promise<AxiosResponse<ResponseDataType>>,
  Codec: ioTs.Type<ResponseDataType>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DecodeError: { new (...args: any[]): DecodeErrorType },
  transformError: (error: Error) => ErrorType | Promise<ErrorType>
) {
  return wrapNetworkCall<ResponseDataType, ErrorType | DecodeErrorType>(async () => {
    const response = await networkCallFunction();
    if (!guardResponseType(response, Codec)) {
      console.error(getCodecErrorReport(response, Codec));
      throw new DecodeError(getCodecErrorReport(response, Codec));
    }
    return response;
  }, transformError);
}
