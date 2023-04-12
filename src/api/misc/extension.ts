/*
 * Copyright (c) 2022-2023 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { globalVar } from "~/constants/env";
import { ExtensionManifest, ExtensionManifestDecodeError } from "./models/extension";
import { AxiosInstance } from "axios";
import { Validate } from "@accelbyte/sdk";

export const fetchExtensionManifest = (network: AxiosInstance) => {
  const extensionURL = globalVar.JUSTICE_BASE_PATH;
  return Validate.responseType<ExtensionManifest>(
    () => network.get(`${extensionURL}/extension-manifest.json`),
    ExtensionManifest
  );
};
