/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

const paths = require("../config/paths");
const fs = require("fs-extra");
const glob = require("glob");
const packageJson = require(paths.appPackageJson);

async function generate() {
  const fileName = `extension-manifest.json`;
  const filePath = `${paths.appPublic}/${fileName}`;
  const filePathBuild = `${paths.appBuild}/${fileName}`;

  try {
    const modules = findModules("./src/packages");

    await fs.writeJson(filePath, makeBuildObject(modules), {
      spaces: 2,
    });
    await fs.copy(filePath, filePathBuild);
  } catch (error) {
    throw new Error(`Failed to generate extension module`);
  }
}

function makeBuildObject(modules) {
  return {
    name: packageJson.name,
    author: packageJson.author,
    clientName: packageJson.clientName,
    prefix: "", // NOTE: placeholder will be updated later by prefix-replace.sh in docker-entrypoint.sh
    modules: modules,
    // icon_path: "extension-icons/extension_icons.css" // uncomment to enable extension icon injection to core
  };
}

function findModules(src) {
  const files = glob.sync(src + "/**/module.json");

  const modules = files.map((file) => {
    const path = file.split("/");
    path.pop();

    const subModules = findSubmodules(path.join("/"));
    const module = JSON.parse(fs.readFileSync(file));

    module.title = findTranslation(module.title);
    module.subModules = getUniqueListByKey(subModules, "id");
    return module;
  });

  return getUniqueListByKey(modules, "id");
}

function findSubmodules(src) {
  const files = glob.sync(src + "/**/submodule.json");

  return files.map((file) => {
    const subModule = JSON.parse(fs.readFileSync(file));
    subModule.title = findTranslation(subModule.title);
    return subModule;
  });
}

function getUniqueListByKey(arr, key) {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
}

function findTranslation(key) {
  const i18nConfig = JSON.parse(fs.readFileSync("./src/utils/i18n/config.json"));
  const translations = {};
  i18nConfig.languageCodes.map((code) => {
    translations[code] = JSON.parse(fs.readFileSync(`./src/utils/i18n/translations/${code}.json`))[key];
  });
  return translations;
}

generate();
