import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Avatar, Button, DropdownMenu, Heading } from "@radix-ui/themes";
import { AngleIcon } from "@radix-ui/react-icons";

const Header: React.FC = () => {
  return (
    <NavigationMenu.Root className="border-b-1 flex items-center justify-between border-b-2 p-3">
      {/* Logo */}
      <NavigationMenu.List className="flex items-center justify-end gap-4">
        <NavigationMenu.Item>
          <span className="flex items-center justify-center gap-x-2">
            <AngleIcon width="24" height="24" />
            <Heading>Jobfinder</Heading>
          </span>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      {/* Middle section */}
      <NavigationMenu.List className="flex items-center justify-end gap-4">
        <NavigationMenu.Item>
          <Button variant="soft" radius="full">
            Főoldal
          </Button>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      {/* Right side section */}
      <NavigationMenu.List className="flex items-center justify-end gap-2">
        <NavigationMenu.Item>
          <Button variant="soft" radius="full">
            Bejelentkezés
          </Button>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <Button variant="soft" radius="full">
            Regisztáció
          </Button>
        </NavigationMenu.Item>
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
              <DropdownMenu.Item>Profil</DropdownMenu.Item>
              <DropdownMenu.Item>Kijelentkezés</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </NavigationMenu.Item>
      </NavigationMenu.List>
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};

export default Header;
