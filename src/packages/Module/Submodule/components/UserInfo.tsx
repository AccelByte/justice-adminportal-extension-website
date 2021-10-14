/*
 * Copyright (c) 2021. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { CardInformationTable, HorizontalFieldText } from "justice-ui-library";
import { AdminUser } from "../../../../api/iam/models/user";
import { t } from "../../../../utils/i18n/i18n";

interface Props {
  user: AdminUser;
}
const UserInfo = ({ user }: Props) => {
  return (
    <CardInformationTable>
      <HorizontalFieldText label={t("example.module.subModule.examplePage.userInfo.displayName")}>
        {user.displayName}
      </HorizontalFieldText>
      <HorizontalFieldText label={t("example.module.subModule.examplePage.userInfo.userName")}>
        {user.userName}
      </HorizontalFieldText>
      <HorizontalFieldText label={t("example.module.subModule.examplePage.userInfo.emailAddress")}>
        {user.emailAddress}
      </HorizontalFieldText>
      <HorizontalFieldText label={t("example.module.subModule.examplePage.userInfo.country")}>
        {user.country}
      </HorizontalFieldText>
      <HorizontalFieldText label={t("example.module.subModule.examplePage.userInfo.dateOfBirth")}>
        {user.dateOfBirth}
      </HorizontalFieldText>
    </CardInformationTable>
  );
};

export default UserInfo;
