import { footerContent } from "../footer.data";

interface FooterNavigationProps {
  onNavigate?: () => void;
}

export function FooterNavigation({
  onNavigate,
}: FooterNavigationProps) {
  return (
    <nav
      aria-label="Footer navigation"
      className="mt-8 md:mt-6"
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {footerContent.navigation.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              onClick={onNavigate}
              className="
                text-sm
                font-medium
                text-white/80
                transition-colors
                duration-200
                hover:text-white
              "
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}