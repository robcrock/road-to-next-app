"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { verifyPasswordHash } from "@/features/password/utils/hash-and-verify";
import { createSession } from "@/lib/lucia";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { generateRandomToken } from "@/utils/crypto";

import { setSessionCookie } from "../utils/session-cookie";

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export const signIn = async (_actionState: ActionState, formData: FormData) => {
  try {
    // Validate form data
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if the user is not found, return an error
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    // verify that the users password in the database matches
    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    // if the password is not valid, return an error
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    // Create session
    const sessionToken = generateRandomToken();
    const session = await createSession(sessionToken, user.id);
    // Create session cookie
    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
};
