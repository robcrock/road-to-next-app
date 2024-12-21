import { ReactElement, SVGProps } from "react";

export type NavItem = {
  separator?: boolean;
  title: string;
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  href: string;
};
