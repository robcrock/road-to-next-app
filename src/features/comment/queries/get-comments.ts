"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";

export const getComments = async (ticketId: string, cursor?: string) => {
  const { user } = await getAuth();

  const where = {
    ticketId,
    id: {
      lt: cursor,
    },
  };

  const take = 2;

  const transaction = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      // Taking one more is called "deliberate overfetching".
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      // This line is essential for cursor-based pagination.
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    }),
    prisma.comment.count({
      where,
    }),
  ]);

  let [comments] = transaction;
  const [, count] = transaction;

  // If we are returning more comments than our original take, we know there is a next page.
  const hasNextPage = comments.length > take;
  // If we have a next page, we remove the last comment from the list.
  comments = hasNextPage ? comments.slice(0, -1) : comments;

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      hasNextPage,
      cursor: comments.at(-1)?.id,
    },
  };
};
