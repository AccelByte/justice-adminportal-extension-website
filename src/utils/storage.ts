/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import LZ from "lz-string";

const storageMethods = (storageType: Storage, isCompressed: boolean) => ({
  setObject: (key: string, value: any) => {
    if (!isCompressed) {
      storageType.setItem(key, JSON.stringify(value));
      return;
    }

    storageType.setItem(key, LZ.compressToUTF16(JSON.stringify(value)));
  },

  getObject: (key: string) => {
    const value = storageType.getItem(key);
    if (!value) return null;

    if (!isCompressed) {
      return JSON.parse(value);
    }

    try {
      const decompress = LZ.decompressFromUTF16(value);
      if (!decompress) throw new Error("Failed to decompress data");
      return JSON.parse(decompress);
    } catch (e) {
      if (process.env.NODE_ENV !== "production") console.error(e);
      return null;
    }
  },
});

const extendedStorage = (isCompressed = false) => ({
  localStorage: storageMethods(localStorage, isCompressed),
  sessionStorage: storageMethods(sessionStorage, isCompressed),
});

export default extendedStorage;
