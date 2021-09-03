/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { MessageType, sendMessageToParentWindow } from "./iframe";

export enum ToastType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}

export interface ToastNotificationProps {
  appearance: ToastType;
  message: React.ReactNode;
}

export const showToastNotification = (data: ToastNotificationProps) => {
  sendMessageToParentWindow({
    message: { messageType: MessageType.notification, data },
  });
};

export function showToastNotificationError(message: string) {
  return showToastNotification({ message, appearance: ToastType.error });
}

export function showToastNotificationSuccess(message: string) {
  return showToastNotification({ message, appearance: ToastType.success });
}
