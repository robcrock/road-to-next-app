import Link from "next/link";
import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Comments } from "@/features/comment/components/comments";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

import { TICKET_ICONS } from "../constants";

import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
};

const TicketItem = async ({ ticket, isDetail }: TicketItemProps) => {
  const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket);
  const { id, title, content, status } = ticket;

  const editButton = isTicketOwner ? (
    <Button size="icon" variant="outline" asChild>
      <Link prefetch href={ticketEditPath(id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  ) : null;

  const detailButton = (
    <Button asChild size="icon" variant="outline">
      <Link prefetch href={ticketPath(id)} className="text-sm ">
        <LucideSquareArrowOutUpRight className="w-4 h-4" />
      </Link>
    </Button>
  );

  const trigger = (
    <Button variant="outline" size="icon">
      <LucideMoreVertical className="w-4 h-4" />
    </Button>
  );

  const moreMenu = isTicketOwner ? (
    <TicketMoreMenu ticket={ticket} trigger={trigger} />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4 animate-fade-in-from-top", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className={"flex gap-x-2"}>
        <Card className="w-full  ">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <span>{TICKET_ICONS[status]}</span>
              <span key={id} className="truncate">
                {title}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <span
              className={clsx(" whitespace-break-spaces", {
                "line-clamp-3": !isDetail,
              })}
            >
              {content}
            </span>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
            </p>
          </CardFooter>
        </Card>
        <div className="flex flex-col gap-y-1">
          {isDetail ? (
            <>
              {editButton}
              {moreMenu}
            </>
          ) : (
            <>
              {detailButton}
              {editButton}
            </>
          )}
        </div>
      </div>
      {isDetail ? <Comments ticketId={id} /> : null}
    </div>
  );
};

export { TicketItem };
