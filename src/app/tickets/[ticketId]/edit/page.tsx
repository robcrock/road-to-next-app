import { notFound } from "next/navigation";

import { CardCompact } from "@/components/card-compact";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type Params = Promise<{
  ticketId: string;
}>;

const TicketEditPage = async (props: { params: Params }) => {
  const params = await props.params;
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
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
