import { ReactElement, SVGProps } from "react";

export type NavItem = {
  title: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  href: string;
};
