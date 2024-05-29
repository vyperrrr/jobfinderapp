import { NavLink } from "react-router-dom";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Avatar, DropdownMenu, Heading } from "@radix-ui/themes";
import NavLinkButton from "./NavLinkButton";

import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Header: React.FC = () => {
  const { user, token } = useAuth();
  const dispatch = useDispatch();

  return (
    <div>
      <NavigationMenu.Root className="border-b-1 flex items-center justify-between p-4">
        {/* Left side section */}
        <NavigationMenu.List className="flex items-center justify-end gap-4"></NavigationMenu.List>
        {/* Right side section */}
        <NavigationMenu.List className="flex items-center justify-end gap-2">
          <NavigationMenu.Item>
            <NavLinkButton to="/" radius="full">
              Főoldal
            </NavLinkButton>
          </NavigationMenu.Item>
          {!token && (
            <>
              <NavigationMenu.Item>
                <NavLinkButton to="/auth/login" radius="full">
                  Bejelentkezés
                </NavLinkButton>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavLinkButton to="/auth/register" radius="full">
                  Regisztráció
                </NavLinkButton>
              </NavigationMenu.Item>
            </>
          )}
          {user?.role === "company" && (
            <NavigationMenu.Item>
              <NavLinkButton to="/advertisements/new" radius="full">
                Álláshirdetés hozzáadása
              </NavLinkButton>
            </NavigationMenu.Item>
          )}
          {token && (
            <NavigationMenu.Item>
              <DropdownMenu.Root dir="rtl">
                <DropdownMenu.Trigger>
                  <Avatar
                    src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                    fallback="A"
                    width="24"
                    height="24"
                    radius="full"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="soft">
                  <NavLink to="/profile">
                    <DropdownMenu.Item>Profil </DropdownMenu.Item>
                  </NavLink>
                  <DropdownMenu.Item onClick={() => dispatch(logout())}>
                    Kijelentkezés
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </NavigationMenu.Item>
          )}
        </NavigationMenu.List>
        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
      <NavigationMenu.Root className="border-b-1 flex items-center justify-between p-6 dark:bg-slate-800">
        {/* Logo */}
        <NavigationMenu.List className="flex items-center justify-end gap-4">
          <NavigationMenu.Item>
            <span className="flex items-center justify-center gap-x-2">
              <NavLink to="/" end>
                <Heading>Állásportál</Heading>
              </NavLink>
            </span>
          </NavigationMenu.Item>
        </NavigationMenu.List>
        <NavigationMenu.Viewport />
      </NavigationMenu.Root>
    </div>
  );
};

export default Header;
