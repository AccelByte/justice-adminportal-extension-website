/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { sendMessageToParentWindow } from "./iframe";
import { isAxiosNetworkError, isAxiosServerError } from "~/api/errorDeducer";
import { t } from "./i18n/i18n";
import { translateServiceErrorForAdmin } from "justice-js-common-utils";
import { extractServiceErrorCode } from "~/api/serviceErrorDeducer";
import ReactDomServer from "react-dom/server";
import { ReactElement, ReactNode } from "react";
import { MessageType } from "~/models/iframe";

export enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export interface ToastNotificationProps {
  appearance: ToastType;
  message: ReactNode;
  errorCode?: number;
  defaultErrorMessage?: string;
}

export const showToastNotification = (data: ToastNotificationProps) => {
  const stringMessage =
    typeof data.message === "string" ? data.message : ReactDomServer.renderToStaticMarkup(data.message as ReactElement);
  const notificationData: ToastNotificationProps = {
    appearance: data.appearance,
    message: stringMessage,
  };

  sendMessageToParentWindow({
    message: { messageType: MessageType.notification, data: notificationData },
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

export function showToastNotificationSuccess(message: ReactNode) {
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
