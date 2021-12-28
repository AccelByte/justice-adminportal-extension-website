/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "../api/types";
import * as H from "history";
import { ToastNotificationProps } from "./notification";
import { isInIframe } from "./browserIframeSwitch";

export const MessageType = Enum("locationChange", "notification", "sessionExpired", "downloadFile");
const DEFAULT_CHANNEL = "admin-extension";
const DEFAULT_ORIGIN = "*";

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

export type Message = NotificationMessage | LocationChangeMessage | sessionExpiredMessage | downloadFileMessage;

interface SendMessageEvent {
  channel?: string;
  message: Message;
  origin?: string;
}

export function sendMessageToParentWindow({
  message,
  channel = DEFAULT_CHANNEL,
  origin = DEFAULT_ORIGIN,
}: SendMessageEvent) {
  const useParse = message.messageType !== MessageType.downloadFile;
  const parsedMessage = useParse ? JSON.stringify({ ...message, channel }) : { ...message, channel };

  if (!isInIframe()) {
    console.log("Message to parent window ignored: ", { ...message, channel });
    return;
  }
  window.parent.postMessage(parsedMessage, origin);
}

export function downloadFile({ fileBlob, fileName }: { fileBlob: Blob; fileName: string }) {
  sendMessageToParentWindow({
    message: {
      data: { fileBlob, fileName },
      messageType: MessageType.downloadFile,
    },
  });
}
