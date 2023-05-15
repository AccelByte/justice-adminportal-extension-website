/*
 * Copyright (c) 2022 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import React from "react";
import classNames from "classnames";
import "./Loading.scss";

export interface LoadingProps {
  show?: boolean;
  loadingInfo?: string;
  loadingModal?: boolean;
  loadingLeft?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  show = true,
  loadingInfo = "",
  loadingModal = true,
  loadingLeft = false,
}) => (
  <div
    className={classNames("loading-wrap", { show }, { "loading-modal": loadingModal }, { "loading-left": loadingLeft })}
  >
    <div className="loading-flag">
      <span className="loading-icon" />
      {!!loadingInfo && <span className="loading-info">{loadingInfo}</span>}
    </div>
  </div>
);
