/*
 * Copyright (c) 2021 - 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { isInIframe } from "./browserIframeSwitch";
import { onAdminMessageReceived } from "~/utils/postMessageHandler";
import { CallBackType, MessageType, SendMessageEvent } from "~/models/iframe";
import { z } from "zod";
import { useParams } from "react-router-dom";

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
  Codec: z.ZodType<MessageDataType>;
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
  Codec: z.ZodType<MessageDataType>;
}) {
  const addAndRemoveListener = new Promise((resolve) => {
    let timeout: any = null;
    const handleMessage = (message: MessageEvent) => {
      onAdminMessageReceived(message, callback, { adminChannelId: ADMIN_CHANNEL_ID }, Codec);
      // if message recived, remove listener and resolve timeout
      window.removeEventListener("message", handleMessage, false);
      resolve(timeout);
    };

    window.addEventListener("message", handleMessage, false);

    // if no message received after timeout, remove listener and resolve the promise
    timeout = setTimeout(() => {
      window.removeEventListener("message", handleMessage, false);
      resolve(null);
    }, timeoutMs);
  });

  const timeout: any = await addAndRemoveListener;
  // if resolved but timeout still exist then clear timeout
  if (timeout) clearTimeout(timeout);
}

export const useExtensionPrefix = () => {
  const { namespace } = useParams<{ namespace: string }>();
  const withPrefixUrl = (path: string) => `/namespaces/${namespace}${path}`;
  const withPrefixPath = (path: string) => `/namespaces/:namespace${path}`;
  return { withPrefixUrl, withPrefixPath };
};
