"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey("toast");

      console.log("message", message);

      if (message) {
        toast.success(message);
        await deleteCookieByKey("toast");
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
