"use server";

import { cache } from "react";
import { cookies } from "next/headers";

import { validateSession } from "@/lib/lucia";

import { SESSION_COOKIE_NAME } from "../utils/session-cookie";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;

  if (!sessionToken) {
    return {
      user: null,
      session: null,
    };
  }

  return await validateSession(sessionToken);
});
