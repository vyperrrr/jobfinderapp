import { ButtonProps } from "@radix-ui/themes";
import { NavLinkProps } from "react-router-dom";

export type NavLinkButtonProps = ButtonProps &
  NavLinkProps & {
    children: React.ReactNode;
  };
