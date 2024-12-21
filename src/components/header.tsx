"use client";

import Link from "next/link";
import { LucideKanban } from "lucide-react";

import { AccountDropdown } from "@/components/account-dropdown";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath } from "@/paths";

import { ThemeSwitcher } from "./theme/theme-switcher";
import { buttonVariants } from "./ui/button";

const Header = () => {
  const { user, isFetched } = useAuth();

  console.log("user", user);

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <AccountDropdown user={user} />
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav
      className="
      animate-header-from-top
            supports-backdrop-blur:bg-background/60
            fixed left-0 right-0 top-0 z-20
            border-b bg-background/95 backdrop-blur
            w-full flex py-2.5 px-5 justify-between
          "
    >
      <div className="flex align-items gap-x-2">
        <Link
          href={homePath()}
          className={buttonVariants({ variant: "ghost" })}
        >
          <LucideKanban />
          <h1 className="text-md font-semibold">TicketBounty</h1>
        </Link>
      </div>
      <div className="flex align-items gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
};

export { Header };
