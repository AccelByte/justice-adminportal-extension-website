/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { PermissionGuard } from "justice-js-common-utils";
import { Card, ErrorWrapper, Page } from "justice-ui-library";
import { useAppContext } from "../../../../app-states/AppProvider/AppProvider";
import { useParams } from "react-router-dom";
import { adminCanReadUser } from "../../../../components/PermissionGuard";
import UserInfo from "../components/UserInfo";
import { t } from "../../../../utils/i18n/i18n";

export const ExamplePage = () => {
  const { user } = useAppContext();
  const { namespace } = useParams<{ namespace: string }>();
  const [permission] = React.useState(() => {
    return new PermissionGuard({ user, currentNamespace: namespace });
  });

  return (
    <Page title={t("example.module.subModule.examplePage.title")}>
      <Card cardTitle={t("example.module.subModule.examplePage.userInfo.title")} noHorizontalMargin>
        {!permission.hasPermission(adminCanReadUser()) && (
          <div className="my-4">
            <ErrorWrapper title={t("common.error.401.title")} subTitle={t("common.error.401.subTitle")} />
          </div>
        )}
        {user && permission.hasPermission(adminCanReadUser()) && <UserInfo user={user} />}
      </Card>
    </Page>
  );
};
