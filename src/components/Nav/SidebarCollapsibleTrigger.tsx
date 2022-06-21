import classNames from "classnames";
import React from "react";
import { renderToString } from "react-dom/server";
import { isEllipsisShowedLogic } from "./SidebarNavLinks";

export interface CustomTriggerProps {
  text?: React.ReactNode;
  parentNav?: boolean;
  icon?: string;
}
export const SidebarCollapsibleTrigger = (props: CustomTriggerProps) => {
  const navRef = React.useRef<HTMLElement>(null);
  const [isEllipsisShowed, setIsEllipsisShowed] = React.useState(false);
  const { text, parentNav, icon } = props;

  React.useEffect(() => {
    if (parentNav) {
      setIsEllipsisShowed(isEllipsisShowedLogic(navRef, text, parentNav));
    } else {
      setIsEllipsisShowed(isEllipsisShowedLogic(navRef, text));
    }
  }, [text]);

  const tooltipProps = isEllipsisShowed && {
    "data-tip": React.isValidElement(text) ? renderToString(text) : text,
    "data-place": "right",
  };

  return (
    <span ref={navRef} {...tooltipProps} className={classNames(!parentNav && "collapsible-child")}>
      <span className={classNames("menu-item-container", !parentNav && "nav-link-a")}>
        {!parentNav && <i className={icon} />}
        <span>{props.text}</span>
      </span>
    </span>
  );
};