import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketPath, ticketsPath } from "@/paths";

type Params = Promise<{
  ticketId: string;
}>;

const TicketEditPage = async (props: { params: Params }) => {
  const params = await props.params;
  const ticket = await getTicket(params.ticketId);

  const isTicketFound = !!ticket;

  if (!isTicketFound || !ticket.isOwner) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: ticketsPath() },
          { title: ticket.title, href: ticketPath(ticket.id) },
          { title: "Edit" },
        ]}
      />
      <Separator />
      <div className="flex-1 flex flexcol justify-center items-center">
        <CardCompact
          title={"Edit Ticket"}
          description={"Edit an existing ticket."}
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<TicketUpsertForm ticket={ticket} />}
        />
      </div>
    </div>
  );
};

export default TicketEditPage;
