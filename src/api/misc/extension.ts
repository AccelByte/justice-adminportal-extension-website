/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { Network } from "~/api/networkManager";
import { globalVar } from "~/constants/env";
import { guardNetworkCall } from "~/api/networkCallTypeguard";
import { ExtensionManifest, ExtensionManifestDecodeError } from "./models/extension";

export const fetchExtensionManifest = (network: Network) => {
  const extensionURL = globalVar.JUSTICE_BASE_PATH;
  return guardNetworkCall(
    () => network.get(`${extensionURL}/extension-manifest.json`),
    ExtensionManifest,
    ExtensionManifestDecodeError,
    (error) => error
  );
};
