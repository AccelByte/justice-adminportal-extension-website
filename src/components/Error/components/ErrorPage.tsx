/*
 * Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import * as React from "react";
import { default as classNames } from "classnames";
import "./ErrorPage.scss";

export interface Props {
  className?: string;
  image?: string;
  title: React.ReactNode;
  subTitle: React.ReactNode;
}

const ErrorPage = (props: Props) => {
  const { className, image, title, subTitle } = props;

  return (
    <div className={classNames("errorPageContainer", className)}>
      {image && <img src={image} alt={"error"} />}
      <div className="title">{title}</div>
      <div className="subTitle">{subTitle}</div>
    </div>
  );
};

export default ErrorPage;
