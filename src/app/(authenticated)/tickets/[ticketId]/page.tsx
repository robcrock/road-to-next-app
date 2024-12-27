import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { getComments } from "@/features/comment/queries/get-comments";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { ticketsPath } from "@/paths";

// INFO: Referencing https://nextjs.org/docs/app/building-your-application/upgrading/version-15#asynchronous-page
type Params = Promise<{ ticketId: string }>;

const TicketPage = async (props: { params: Params }) => {
  const params = await props.params;
  const ticketPromis = getTicket(params.ticketId);
  const commentsPromis = getComments(params.ticketId);

  const [ticket, comments] = await Promise.all([ticketPromis, commentsPromis]);

  if (!ticket) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: ticketsPath() },
          { title: ticket.title },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} comments={comments} isDetail />
      </div>
    </div>
  );
};

export default TicketPage;
