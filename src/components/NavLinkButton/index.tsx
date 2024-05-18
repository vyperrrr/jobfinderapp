import { Button } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

import { NavLinkButtonProps } from "./types";

const NavLinkButton: React.FC<NavLinkButtonProps> = ({
  to,
  children,
  ...props
}) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button {...props} variant={isActive ? "solid" : "soft"}>
          {children}
        </Button>
      )}
    </NavLink>
  );
};

export default NavLinkButton;
