/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { BaseAppEvent } from "../../utils/event";
import { AdminUser } from "../../api/iam/models/user";

type UserEventTypes = {
  userLoaded: AdminUser;
  userError: Error;
};

export class UserSessionEvent extends BaseAppEvent<UserEventTypes> {
  userLoaded(user: AdminUser) {
    this.emit("userLoaded", user);
  }

  userError(error: Error) {
    this.emit("userError", error);
  }
}

export default new UserSessionEvent();
