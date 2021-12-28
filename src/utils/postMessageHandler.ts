/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { globalVar } from "~/constants/env";
import { ParentMessageData } from "~/models/parentMessage";
import { CallBackType } from "~/models/iframe";
import * as ioTs from "io-ts";
import { reporter } from "io-ts-reporters";

interface ParentData {
  adminChannelId: string;
}

export const onAdminMessageReceived = <MessageDataType>(
  message: MessageEvent,
  callback: CallBackType,
  parentData: ParentData,
  Codec: ioTs.Type<MessageDataType>
) => {
  try {
    const messageData = getMessageDataOrThrowError(message, parentData, Codec);

    callback(messageData);
  } catch (error) {
    console.error(`${error} The message is ignored.`);
  }
};

const getMessageDataOrThrowError = <MessageDataType>(
  message: MessageEvent,
  parentData: ParentData,
  Codec: ioTs.Type<MessageDataType>
): MessageDataType => {
  const { adminChannelId } = parentData;

  // check if the origin of the message is equal to the origin of the AP
  if (!globalVar.JUSTICE_ADMINPORTAL_URL.startsWith(message.origin)) {
    throw new Error("Message origin is not known by extension website.");
  }

  const messageData = validateMessageData(JSON.parse(message.data), ParentMessageData);

  // check if the channel sent by the message is equal to the ones in AP extension
  if (messageData.channel !== adminChannelId) {
    throw new Error("Unrecognized message channel. The channel is not from Admin Portal.");
  }

  // return the data if there's no error
  return validateMessageData(messageData.data, Codec);
};

const validateMessageData = <MessageDataType>(data: unknown, Codec: ioTs.Type<MessageDataType>): MessageDataType => {
  if (!Codec.is(data)) {
    console.error(reporter(Codec.decode(data)).join(" "));
    throw new Error("Unrecognized data type.");
  }
  return data;
};
