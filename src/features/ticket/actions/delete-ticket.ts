"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  // INFO: Revalidate the tickets page to reflect the changes before redirecting
  revalidatePath(ticketsPath());
  redirect(ticketsPath());
};
