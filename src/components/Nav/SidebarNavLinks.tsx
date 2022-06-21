import React from "react";
import { renderToString } from "react-dom/server";
import { NavLink, NavLinkProps } from "react-router-dom";
import { getDomWidthByRef, getHorizontalMargin } from "../common-components/utils/dom";

export const isEllipsisShowedLogic = (navRef: React.RefObject<HTMLElement>, text: React.ReactNode, parentNav?: boolean) => {
  if (navRef && navRef.current) {
    if (parentNav) {
      return (
        getDomWidthByRef(navRef.current, ".menu-item-container > span") >
        getDomWidthByRef(navRef.current, ".menu-item-container")
      );
    }
    return (
      getDomWidthByRef(navRef.current, ".menu-item-container > span") >
      getDomWidthByRef(navRef.current, ".menu-item-container") -
        getDomWidthByRef(navRef.current, ".menu-item-container > i") -
        getHorizontalMargin(navRef.current, ".menu-item-container > span")
    );
  }
  return false;
};

export interface CustomNavLinkProps extends NavLinkProps {
  tooltip?: React.ReactNode;
}

export const SidebarNavLink = (props: CustomNavLinkProps) => {
  const navRef = React.useRef<HTMLElement>(null);
  const [isEllipsisShowed, setIsEllipsisShowed] = React.useState(false);
  const { tooltip } = props;

  React.useEffect(() => {
    setIsEllipsisShowed(isEllipsisShowedLogic(navRef, tooltip));
  }, [props.children]);

  const tooltipProps = isEllipsisShowed && {
    "data-tip": React.isValidElement(tooltip) ? renderToString(tooltip) : tooltip,
    "data-place": "right",
  };

  return (
    <NavLink className="menu-item" {...props} {...tooltipProps}>
      <span ref={navRef}>
        <span className="menu-item-container">{props.children}</span>
      </span>
    </NavLink>
  );
};
