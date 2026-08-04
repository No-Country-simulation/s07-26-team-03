
import { navigationItems } from "./navbar.data";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileNavigation } from "./components/MobileNavigation";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { Logo } from "@/shared/components/ui/logo/Logo";
import { Container } from "@/shared/components/ui/container/Container";
import { Button } from "@/shared/components/ui/button/Button";
import { IoMenuOutline } from "react-icons/io5";
import { NavAction } from "./components/NavAction";

export function Navbar() {
  const menu = useMobileMenu();

  return (
   <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md">
      <Container fluid>
        <div className="flex h-20 items-center justify-between">

          <Logo />

          <DesktopNavigation
            items={navigationItems}
          />

          <NavAction />

          <Button
            variant="ghost"
            color="surface"
            className="lg:hidden"
            onClick={menu.toggle}
            aria-label="Open menu"
          >
            <IoMenuOutline className="text-2xl text-surface"  />
          </Button>

        </div>
      </Container>

      <MobileNavigation
        items={navigationItems}
        isOpen={menu.isOpen}
        onClose={menu.close}
      />
    </header>
  );
}