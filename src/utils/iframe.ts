/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "../api/types";
import * as H from "history";
import { ToastNotificationProps } from "./notification";
import { isInIframe } from "./browserIframeSwitch";

export const MessageType = Enum("locationChange", "notification");
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

export type Message = NotificationMessage | LocationChangeMessage;

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
  const parsedMessage = JSON.stringify({ ...message, channel });

  if (!isInIframe()) {
    console.log("Message to parent window ignored: ", { ...message, channel });
    return;
  }
  window.parent.postMessage(parsedMessage, origin);
}
