/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Container } from "unstated";

export default class BaseLogic<T extends object> extends Container<T> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  deinit() {}
}
