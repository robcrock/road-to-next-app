import { notFound } from "next/navigation";

import { CardCompact } from "@/components/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type Params = Promise<{
  ticketId: string;
}>;

const TicketEditPage = async (props: { params: Params }) => {
  const { user } = await getAuth();
  const params = await props.params;
  const ticket = await getTicket(params.ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flexcol justify-center items-center">
      <CardCompact
        title={"Edit Ticket"}
        description={"Edit an existing ticket."}
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage;
