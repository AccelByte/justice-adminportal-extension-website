/*
 * Copyright (c) 2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import rollupPluginReplace from "rollup-plugin-replace";
import rollupPluginCommonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { resolve } from "path";
import { getAvailableEnvVars } from "./scripts/env-parser";

const pathSrc = resolve(__dirname, "src");

const normalizeBasePath = (base: string) => {
  return `/${base.replace(/(^\/*)|(\/*$)/g, "")}/`;
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  const availableEnvVars = getAvailableEnvVars();

  return defineConfig({
    plugins: [react({ jsxRuntime: "classic" })],
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    base: process.env.BASE_PATH ? normalizeBasePath(process.env.BASE_PATH) : "/admin-extension/",
    build: {
      outDir: resolve(__dirname, "./build/admin-extension"),
      minify: true,
      target: "ESNext",
      sourcemap: process.env.NODE_ENV === "development",
      rollupOptions: {
        plugins: [
          rollupPluginReplace({
            "process.env.NODE_ENV": JSON.stringify("production"),
          }),
          rollupPluginCommonjs(),
          terser(),
        ],
      },
    },
    define: {
      "process.env": process.env.NODE_ENV === "production" ? "process.env" : JSON.stringify(availableEnvVars),
    },
    resolve: {
      alias: {
        "~": pathSrc,
        src: pathSrc,
        "@packages": resolve(__dirname, "./src/packages"),
        stream: resolve(__dirname, "./node_modules/stream-browserify"),
        "lz-string": resolve(__dirname, "./node_modules/lz-string"),
        "~bootstrap": resolve(__dirname, "./node_modules/bootstrap"),
        "justice-ui-library": resolve(__dirname, "./node_modules/justice-ui-library/build/index"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          sourceMap: false,
          additionalData: `
            @import "~bootstrap/scss/bootstrap.scss";
            @import "./src/styles/variables";
            @import "./src/styles/icons";
            @import "./src/styles/ab_icons";
            @import "./src/styles/extension_icons";
          `,
        },
      },
    },
    optimizeDeps: {
      include: ["stream"],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
    server: {
      host: true,
      port: Number(process.env.PORT || 3003),
      watch: {
        usePolling: true,
      },
      fs: {
        allow: ["../.."],
      },
    },
  });
};
