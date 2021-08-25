/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

"use strict";

const path = require("path");
const fs = require("fs-extra");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// config after eject: we're in ./config/
module.exports = {
  appBuild: resolveApp("build/admin-extension"),
  appPublic: resolveApp("public"),
  appPackageJson: resolveApp("package.json"),
  appVersionJson: resolveApp("version.json"),
};
