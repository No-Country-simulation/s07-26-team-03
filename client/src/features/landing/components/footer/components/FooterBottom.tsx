import { footerContent } from "../footer.data";

export function FooterBottom() {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
        border-t
        border-white/10
        pt-8
        text-sm
        text-surface/70
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      <ul className="flex flex-wrap gap-6">
        {footerContent.legal.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="
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

      <p>{footerContent.copyright}</p>
    </div>
  );
}