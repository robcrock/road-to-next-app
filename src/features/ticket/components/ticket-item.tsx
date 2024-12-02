import Link from "next/link";
import { Ticket } from "@prisma/client";
import clsx from "clsx";
import {
  LucideEdit,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/paths";

import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
  ticket: Ticket;
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

  const deleteButton = (
    // We could have just passed the deleteTicket function if we didn't need to
    // pass the ticketId as a parameter to the function.
    <form action={deleteTicket.bind(null, ticket.id)}>
      <Button size="icon" variant="outline">
        <LucideTrash className="w-4 h-4" />
      </Button>
    </form>
  );

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
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {deleteButton}
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
