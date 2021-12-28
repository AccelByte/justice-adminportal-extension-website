/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isInIframe } from "./browserIframeSwitch";
import { onAdminMessageReceived } from "~/utils/postMessageHandler";
import { CallBackType, MessageType, SendMessageEvent } from "~/models/iframe";
import * as ioTs from "io-ts";

const DEFAULT_CHANNEL = "admin-extension";
const DEFAULT_ORIGIN = "*";
const ADMIN_CHANNEL_ID = "admin";

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

export async function guardSendAndReceiveMessage<MessageDataType>({
  messageToBeSent,
  timeoutMs = 2000,
  Codec,
}: {
  messageToBeSent: SendMessageEvent;
  timeoutMs?: number;
  Codec: ioTs.Type<MessageDataType>;
}): Promise<MessageDataType> {
  let dataFromParent: any = null;
  const callback = (data: any) => {
    dataFromParent = data;
  };

  sendMessageToParentWindow(messageToBeSent);
  await guardListenMessage({ callback, timeoutMs, Codec });

  return new Promise((resolve) => resolve(dataFromParent));
}

async function guardListenMessage<MessageDataType>({
  callback,
  timeoutMs,
  Codec,
}: {
  callback: CallBackType;
  timeoutMs: number;
  Codec: ioTs.Type<MessageDataType>;
}) {
  const removeListener = new Promise((resolve) => {
    return setTimeout(() => {
      window.removeEventListener(
        "message",
        (message) => onAdminMessageReceived(message, callback, { adminChannelId: ADMIN_CHANNEL_ID }, Codec),
        false
      );
      resolve("event listener is removed");
    }, timeoutMs);
  });

  window.addEventListener(
    "message",
    (message) => onAdminMessageReceived(message, callback, { adminChannelId: ADMIN_CHANNEL_ID }, Codec),
    false
  );

  await removeListener;
}
