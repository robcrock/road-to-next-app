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

const TicketItem = ({ ticket, isDetail }: TicketItemProps) => {
  const { id, title, content, status } = ticket;

  const editButton = (
    <Button size="icon" variant="outline" asChild>
      <Link prefetch href={ticketEditPath(id)}>
        <LucidePencil className="w-4 h-4" />
      </Link>
    </Button>
  );

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
  const moreMenu = <TicketMoreMenu ticket={ticket} trigger={trigger} />;

  return (
    <div
      className={clsx("w-full flex gap-x-1 animate-fade-in-from-top", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
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
  );
};

export { TicketItem };
