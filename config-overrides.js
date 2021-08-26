/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

const webpack = require("webpack");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const configPaths = require("./config/paths");

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error("The NODE_ENV environment variable is required but was not specified.");
}

const isDevMode = process.env.NODE_ENV === "development";

const dynamicEnvVars = [
  "JUSTICE_BASE_URL",
  "JUSTICE_BASE_PATH",
  "JUSTICE_PUBLISHER_NAMESPACE",
  "JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE",
];

const getClientEnvironment = () => {
  return dynamicEnvVars.reduce(
    (reducer, key) =>
      Object.assign(reducer, {
        [key]: isDevMode ? JSON.stringify(process.env[key]) : JSON.stringify(`process.env["${key}"]`),
      }),
    {}
  );
};

const getRawEnvar = () => {
  return dynamicEnvVars.reduce((reducer, key) => Object.assign(reducer, { [key]: process.env[key] }), {});
};

module.exports = {
  webpack: function override(config, env) {
    const extraPlugins = [
      new webpack.DefinePlugin({
        "process.env": getClientEnvironment(),
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, getRawEnvar()),
    ];

    config.plugins.push(...extraPlugins);
    return config;
  },
  paths: function (paths, env) {
    paths.appBuild = configPaths.appBuild;
    return paths;
  },
};
