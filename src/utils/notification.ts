/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { MessageType, sendMessageToParentWindow } from "./iframe";
import { isAxiosNetworkError, isAxiosServerError } from "../api/errorDeducer";
import { t } from "./i18n/i18n";
import { translateServiceErrorForAdmin } from "justice-js-common-utils";
import { extractServiceErrorCode } from "../api/serviceErrorDeducer";

export enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export interface ToastNotificationProps {
  appearance: ToastType;
  message: string;
  errorCode?: number;
  defaultErrorMessage?: string;
}

export const showToastNotification = (data: ToastNotificationProps) => {
  sendMessageToParentWindow({
    message: { messageType: MessageType.notification, data },
  });
};

export function showToastNotificationError(error: Error, defaultMessage?: string) {
  if (isAxiosNetworkError(error)) {
    return showToastNotification({ message: t("network.error.noNetwork"), appearance: ToastType.error });
  }
  if (isAxiosServerError(error)) {
    return showToastNotification({ message: t("network.error.serverError"), appearance: ToastType.error });
  }

  return showToastNotification({
    appearance: ToastType.error,
    message: "",
    errorCode: extractServiceErrorCode(error) || 0,
    defaultErrorMessage: defaultMessage,
  });
}

export function showToastNotificationSuccess(message: string) {
  return showToastNotification({ message, appearance: ToastType.success });
}

export const translateError = (error: Error, defaultMessage?: string) => {
  if (isAxiosNetworkError(error)) {
    return t("network.error.noNetwork");
  }
  if (isAxiosServerError(error)) {
    return t("network.error.serverError");
  }
  return translateServiceErrorForAdmin(extractServiceErrorCode(error) || 0, undefined, defaultMessage);
};
