import { footerContent } from "../footer.data";

export function FooterSocial() {
  return (
    <div className="flex flex-col items-start gap-4 md:items-end">
      <span className="text-sm font-medium text-surface">
        Join us
      </span>

      <ul className="flex items-center gap-5">
        {footerContent.social.map((item) => {
          return (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="
                  text-surface/80
                  transition-colors
                  duration-200
                  hover:text-brand-primary-300
                "
              >
                <span className="text-2xl"> {item.icon} </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}