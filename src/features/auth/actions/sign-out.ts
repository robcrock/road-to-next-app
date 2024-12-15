"use server";

import { redirect } from "next/navigation";

import { invalidateSession } from "@/lib/lucia";
import { signInPath } from "@/paths";

import { getAuth } from "../queries/get-auth";
import { deleteSessionCookie } from "../utils/session-cookie";

export const signOut = async () => {
  // 1. Attempt to get the session from the current request.
  const { session } = await getAuth();

  // 2. If there is no session, redirect to the sign-in page.
  if (!session) {
    redirect(signInPath());
  }

  // 3. Invalidate the session and create a new session cookie
  await invalidateSession(session.id);
  // 4. Create a black session cookie for the user
  await deleteSessionCookie();

  // 5. Redirect to the sign-in page
  redirect(signInPath());
};
