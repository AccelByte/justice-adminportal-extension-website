/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

const paths = require("../config/paths");
const fs = require("fs-extra");
const packageJson = require(paths.appPackageJson);
const versionJson = require(paths.appVersionJson);

async function generate() {
  const buildObject = makeBuildObject();

  const fileName = `version.json`;
  const filePath = `${paths.appPublic}/${fileName}`;
  const filePathBuild = `${paths.appBuild}/${fileName}`;

  try {
    await fs.writeJson(filePath, buildObject, {
      spaces: 2,
    });
    await fs.copy(filePath, filePathBuild);
  } catch (error) {
    throw new Error(`Failed to generate build version`);
  }
}

function makeBuildObject() {
  return {
    name: packageJson.name,
    gitHash: process.env.GIT_HASH || "unknown",
    buildDate: new Date().toString(),
    version: versionJson.version,
    dependencies: packageJson.dependencies,
    sha256: "sha256",
  };
}

generate();
