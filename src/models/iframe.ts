/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "justice-ui-library";
import { ToastNotificationProps } from "~/utils/notification";
import * as H from "history";

export const MessageType = Enum(
  "locationChange",
  "notification",
  "sessionExpired",
  "downloadFile",
  "isRefreshSessionLock",
  "refreshWithLock"
);

interface NotificationMessage {
  messageType: typeof MessageType.notification;
  data: ToastNotificationProps;
}

interface LocationChangeMessage {
  messageType: typeof MessageType.locationChange;
  data: H.Location<unknown>;
}

interface sessionExpiredMessage {
  messageType: typeof MessageType.sessionExpired;
}

interface downloadFileMessage {
  messageType: typeof MessageType.downloadFile;
  data: {
    fileBlob: Blob;
    fileName: string;
  };
}

interface isRefreshSessionLockMessage {
  messageType: typeof MessageType.isRefreshSessionLock;
}

interface refreshWithLockMessage {
  messageType: typeof MessageType.refreshWithLock;
}

export type Message =
  | NotificationMessage
  | LocationChangeMessage
  | sessionExpiredMessage
  | downloadFileMessage
  | isRefreshSessionLockMessage
  | refreshWithLockMessage;

export interface SendMessageEvent {
  channel?: string;
  message: Message;
  origin?: string;
}

export type CallBackType<T = any> = (data: T) => void;

export interface listenMessageEvent {
  callback: CallBackType;
  timeoutMs?: number;
}
