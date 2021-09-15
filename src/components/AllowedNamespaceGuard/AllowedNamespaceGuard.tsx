/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import { useParams } from "react-router-dom";
import { globalVar } from "../../constants/env";
import { combinePaths } from "../../utils/url";
import { ExtensionSubModule } from "../../api/misc/models/extension";

export const AllowedNamespaceGuard = ({
  subModule,
  children,
}: {
  subModule: ExtensionSubModule;
  children: React.ReactNode;
}) => {
  const { namespace } = useParams<{ namespace: string }>();
  const { allowedNamespaces } = subModule;
  const filteredNamespaces = allowedNamespaces && allowedNamespaces.filter(Boolean);

  if (!!filteredNamespaces && filteredNamespaces.length > 0 && !filteredNamespaces.includes(namespace)) {
    window.parent.location.href = combinePaths(globalVar.JUSTICE_BASE_URL, "admin/error/403");
    return null;
  }

  return <div>{children}</div>;
};
