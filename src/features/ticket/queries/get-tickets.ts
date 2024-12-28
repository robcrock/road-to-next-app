import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

import { ParsedSearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: ParsedSearchParams
) => {
  const { user } = await getAuth();

  const where = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
  };

  const count = await prisma.ticket.count({ where });
  const maxSkip = Math.max(0, count - searchParams.size);
  const skip = Math.min(searchParams.page * searchParams.size, maxSkip);
  const take = searchParams.size;

  /* 
  Here we are using prisma.$transaction to execute two queries in a single transaction. This is useful when we want to ensure that both queries are executed successfully. In the case where one of the queries fails, the entire transaction will be rolled back.
  */
  const tickets = await prisma.ticket.findMany({
    where,
    skip,
    take,
    orderBy: {
      [searchParams.sortKey]: searchParams.sortValue,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return {
    list: tickets.map((ticket) => ({
      ...ticket,
      isOwner: isOwner(user, ticket),
    })),
    metadata: {
      count,
      hasNextPage: skip + take < count,
    },
  };
};
