/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import ErrorPage from "./components/ErrorPage";
import { t } from "../../utils/i18n/i18n";

export const OopsErrorPage = () => {
  return <ErrorPage title={t("error.general.title")} subTitle={t("error.general.subtitle")} />;
};
