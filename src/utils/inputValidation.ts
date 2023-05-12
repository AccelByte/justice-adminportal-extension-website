/*
 * Copyright (c) 2022. AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { CommonValidationErrorType } from "justice-js-common-utils";
import { t } from "~/utils/i18n/i18n";

export interface GetCommonValidationErrorMessageTranslationParam {
  fieldName: string;
  minLength?: number;
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  acceptedFileExtension?: string;
}

const toTitleCase = (text: string) => text[0].toUpperCase() + text.slice(1);

export const getCommonValidationErrorMessage = (
  commonValidation: CommonValidationErrorType | null,
  translationParam: GetCommonValidationErrorMessageTranslationParam,
  customErrorMap = {}
) => {
  if (!commonValidation) return undefined;
  const commonErrorMap = {
    [CommonValidationErrorType.empty]: t("common.validationErrorMessage.empty", translationParam),
    [CommonValidationErrorType.lessThanLengthLimit]: t(
      "common.validationErrorMessage.lessThanLengthLimit",
      translationParam
    ),
    [CommonValidationErrorType.exceedLengthLimit]: t(
      "common.validationErrorMessage.exceedLengthLimit",
      translationParam
    ),
    [CommonValidationErrorType.invalidFormat]: t("common.validationErrorMessage.invalidFormat", translationParam),
    [CommonValidationErrorType.lessThanMinimumValue]: t(
      "common.validationErrorMessage.lessThanMinimumValue",
      translationParam
    ),
    [CommonValidationErrorType.exceedMaximumValue]: t(
      "common.validationErrorMessage.exceedMaximumValue",
      translationParam
    ),
    [CommonValidationErrorType.invalidValue]: t("common.validationErrorMessage.invalidValue", translationParam),
    [CommonValidationErrorType.containsDecimal]: t("common.validationErrorMessage.containsDecimal", translationParam),
    [CommonValidationErrorType.invalidFileExtensions]: t(
      "common.validationErrorMessage.invalidFileExtensions",
      translationParam
    ),
    [CommonValidationErrorType.containsForbiddenWords]: t(
      "common.validationErrorMessage.containsForbiddenWords",
      translationParam
    ),
    [CommonValidationErrorType.alreadyUsed]: t("common.validationErrorMessage.alreadyUsed", translationParam),
    ...customErrorMap,
  };

  if (commonValidation in commonErrorMap) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return toTitleCase(commonErrorMap[commonValidation]);
  }

  return t("common.validationErrorMessage.default");
};
