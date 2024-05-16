import { Button, ButtonProps } from "@radix-ui/themes";
import { NavLink, NavLinkProps } from "react-router-dom";

export type NavLinkButtonProps = ButtonProps &
  NavLinkProps & {
    children: React.ReactNode;
  };

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
