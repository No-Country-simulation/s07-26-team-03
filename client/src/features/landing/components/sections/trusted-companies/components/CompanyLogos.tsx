import { cn } from "@/shared/lib/cn";

import type { CompanyLogosProps } from "../trusted-companies.types";

export function CompanyLogos({
  companies,
}: CompanyLogosProps) {
  return (
    <ul
      className={cn(
        "grid",
        "grid-cols-2",
        "items-center",
        "gap-10",
        "sm:grid-cols-3",
        "lg:grid-cols-6"
      )}
    >
      {companies.map((company) => {
        const logo = (
          <img
            src={company.image}
            alt={company.name}
            className="
              h-8
              w-auto
              object-contain
              opacity-70
              grayscale
              transition-all
              duration-300
              hover:opacity-100
              hover:grayscale-0
            "
          />
        );

        return (
          <li
            key={company.id}
            className="flex justify-center"
          >
            {company.href ? (
              <a
                href={company.href}
                aria-label={company.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {logo}
              </a>
            ) : (
              logo
            )}
          </li>
        );
      })}
    </ul>
  );
}