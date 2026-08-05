export interface CompanyLogo {
  id: string;

  name: string;

  image: string;

  href?: string;
}

export interface CompanyLogosProps {
  companies: CompanyLogo[];
}