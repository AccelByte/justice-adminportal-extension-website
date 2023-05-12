/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export const globalVar = {
  NODE_ENV: process.env.NODE_ENV,
  JUSTICE_BASE_URL: process.env.JUSTICE_BASE_URL || "",
  JUSTICE_BASE_PATH: process.env.JUSTICE_BASE_PATH || "/admin-extension",
  JUSTICE_ADMINPORTAL_URL: process.env.JUSTICE_ADMINPORTAL_URL || "",
  JUSTICE_PUBLISHER_NAMESPACE: process.env.JUSTICE_PUBLISHER_NAMESPACE || "",
  JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE: process.env.JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE || "",
  EXTENSION_CLIENT_NAME: process.env.EXTENSION_CLIENT_NAME || "",
};
