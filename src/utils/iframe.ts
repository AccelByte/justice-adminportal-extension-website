/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Enum } from "../api/types";

export const ExtensionMessageId = Enum("locationChange", "notification");
const DEFAULT_CHANNEL = "admin-extension";
const DEFAULT_ORIGIN = "*";

export interface Message<T = any> {
  messageId: keyof typeof ExtensionMessageId;
  data: T;
}

interface SendMessageEvent<T> {
  channel?: string;
  message: Message<T> | string;
  origin?: string;
}

export function sendMessageToParentWindow<T>({
  message,
  channel = DEFAULT_CHANNEL,
  origin = DEFAULT_ORIGIN,
}: SendMessageEvent<T>) {
  if (typeof message === "string") {
    window.parent.postMessage(message, origin);
    return;
  }

  window.parent.postMessage(JSON.stringify({ ...message, channel } as Message<T>), origin);
}
