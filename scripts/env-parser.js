/*
 * Copyright (c) 2023 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

const envVarKeys = [
  "NODE_ENV",
  "JUSTICE_BASE_URL",
  "JUSTICE_BASE_PATH",
  "JUSTICE_ADMINPORTAL_URL",
  "JUSTICE_PUBLISHER_NAMESPACE",
  "JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE",
];

exports.getAvailableEnvVars = function getAvailableEnvVars() {
  return envVarKeys.reduce((acc, currentValue) => {
    if (!process.env) {
      throw new Error("process is undefined");
    }
    acc[currentValue] = process.env[currentValue];
    return acc;
  }, {});
};
