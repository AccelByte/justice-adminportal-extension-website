/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { PermissionGuard } from "justice-js-common-utils";
import { Card, CardInformationTable, HorizontalFieldText, ErrorWrapper, Page } from "justice-ui-library";
import { useAppContext } from "../../../../app-states/AppProvider/AppProvider";
import { useParams } from "react-router-dom";
import { adminCanReadUser } from "../../../../components/PermissionGuard";

export const ExamplePage = () => {
  const { user } = useAppContext();
  const { namespace } = useParams<{ namespace: string }>();
  const [permission] = React.useState(() => {
    return new PermissionGuard({ user, currentNamespace: namespace });
  });

  return (
    <Page title="User">
      <Card cardTitle={"Current User"} noHorizontalMargin>
        {!permission.hasPermission(adminCanReadUser()) && (
          <div className="my-4">
            <ErrorWrapper title={"Unauthorized Access"} subTitle={"You don't have access to this page"} />
          </div>
        )}
        {user && permission.hasPermission(adminCanReadUser()) && (
          <CardInformationTable>
            <HorizontalFieldText label="Display Name">{user.displayName}</HorizontalFieldText>
            <HorizontalFieldText label="User Name">{user.userName}</HorizontalFieldText>
            <HorizontalFieldText label="Email Address">{user.emailAddress}</HorizontalFieldText>
            <HorizontalFieldText label="Country">{user.country}</HorizontalFieldText>
            <HorizontalFieldText label="Date Of Birth">{user.dateOfBirth}</HorizontalFieldText>
          </CardInformationTable>
        )}
      </Card>
    </Page>
  );
};
