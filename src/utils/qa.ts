/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 *
 */

import { default as classNames } from "classnames";
import { qaIds } from "~/constants/qa";
import { globalVar } from "~/constants/env";

function ensureExistence() {
  qaIds.reduce((acc: Record<string, unknown>, qaId) => {
    if (qaId in acc) console.error(`Can not have "${qaId}" more than once`);
    acc[qaId] = qaId;
    return acc;
  }, {});
}

ensureExistence();

export function qa(qaId: string) {
  if (!qaIds.includes(qaId)) {
    const errorMessage = `QA label "${qaId}" does not exist`;
    if (globalVar.NODE_ENV === "development") {
      console.error(errorMessage);
    }
    console.error(errorMessage);
    return null;
  }
  return qaId;
}

export function qaProps(...qaValue: any[]) {
  return classNames(...qaValue);
}
