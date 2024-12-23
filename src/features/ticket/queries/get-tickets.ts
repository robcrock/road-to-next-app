import { prisma } from "@/lib/prisma";

import { SearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams
) => {
  return await prisma.ticket.findMany({
    where: {
      userId,
      // This allows for conditional property spreading
      ...(typeof searchParams.search === "string" && {
        title: {
          contains: searchParams.search,
          mode: "insensitive",
        },
      }),
    },
    orderBy: {
      // This allows for conditional property spreading
      ...(searchParams.sort === undefined && { createdAt: "desc" }),
      ...(searchParams.sort === "bounty" && { bounty: "desc" }),
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
};
