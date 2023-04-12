/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { AxiosError, AxiosResponse } from "axios";

/**
 * @deprecated This type is kept for old features. Please use `Validate` from `@accelbyte/sdk` instead.
 */
export type WrapperResultSuccess<ResponseDataType> = {
  response: AxiosResponse<ResponseDataType>;
  error: null;
};

/**
 * @deprecated This type is kept for old features. Please use `Validate` from `@accelbyte/sdk` instead.
 */
export type WrapperResultError<ErrorType> = {
  response: null;
  error: ErrorType | AxiosError;
};

/**
 * @deprecated This type is kept for old features. Please use `Validate` from `@accelbyte/sdk` instead.
 */
export type WrapperResult<ResponseDataType, ErrorType> =
  | WrapperResultSuccess<ResponseDataType>
  | WrapperResultError<ErrorType>;

/**
 * @deprecated This function is kept for old features. Please use `Validate` from `@accelbyte/sdk` instead.
 */
export async function wrapNetworkCall<ResponseDataType, ErrorType>(
  networkCallFunction: () => Promise<AxiosResponse<ResponseDataType>>,
  transformError: (error: Error) => Promise<ErrorType> | ErrorType
): Promise<WrapperResult<ResponseDataType, ErrorType>> {
  try {
    const response = await networkCallFunction();
    return { response, error: null };
  } catch (error) {
    try {
      return { response: null, error: await transformError(error as Error) };
    } catch (errorHandlerException) {
      console.error(`NetworkCallWrapperException: `, errorHandlerException);
      return Promise.resolve({ response: null, error: error as ErrorType });
    }
  }
}
