/*
 * Copyright (c) 2019 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import flatten from "flat";
import i18next, { Resource, StringMap, TOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import config from "./config.json";
import loadedLanguages, { languageMap } from "./loadLanguages";

const languageLocalStorageKey = "i18nextLng";
const availableLanguageCodes = config.languageCodes;
const translationResource: Resource = availableLanguageCodes.reduce((resources: Resource, languageCode: string) => {
  resources[languageCode] = {
    // Loading unflattened resource
    translation: flatten.unflatten(loadedLanguages[languageCode]),
  };
  return resources;
}, {});

function getLocalStorageLanguage(): string {
  const currentLanguageCode = localStorage.getItem(languageLocalStorageKey);
  if (currentLanguageCode && availableLanguageCodes.includes(currentLanguageCode)) {
    return currentLanguageCode;
  }
  return config.defaultLanguage;
}

function setLocalStorageLanguage(language: string) {
  localStorage.setItem(languageLocalStorageKey, language);
}

export const i18nInstance = i18next.use(initReactI18next).createInstance(
  {
    lng: getLocalStorageLanguage(),
    fallbackLng: config.fallbackLanguage,
    preload: availableLanguageCodes,
    resources: translationResource,
    initImmediate: false,
    debug: process.env.NODE_ENV === "development",
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {}
); // Do not remove the callback. It will break the i18n

i18nInstance.on("languageChanged", () => {
  setLocalStorageLanguage(i18nInstance.language);
});

export function t(key: string, options?: TOptions<StringMap> | string) {
  return i18nInstance.t(key, options);
}

export function getCurrentLanguage() {
  return i18nInstance.language;
}

export async function changeLanguage(language: string) {
  await new Promise((resolve) => {
    i18nInstance.changeLanguage(language, resolve);
  });
}
export function getAvailableLanguageCodes() {
  return availableLanguageCodes;
}

interface LangMap {
  [languageCode: string]: string;
}
export function getAvailableLanguageMap(): LangMap {
  return Object.keys(languageMap)
    .filter((languageCode) => availableLanguageCodes.includes(languageCode))
    .reduce((object, languageCode) => {
      return {
        ...object,
        [languageCode]: languageMap[languageCode],
      };
    }, {});
}
