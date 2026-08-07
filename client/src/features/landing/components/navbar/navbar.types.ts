export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export interface DesktopNavigationProps {
  items: NavItem[];
}

export interface MobileNavigationProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export interface NavigationItemProps {
  item: NavItem;
  onClick?: () => void;
  mobile?: boolean;
}