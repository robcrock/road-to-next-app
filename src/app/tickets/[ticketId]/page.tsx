import { notFound } from "next/navigation";

import { RedirectToast } from "@/components/redirect-toast";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";

// INFO: Referencing https://nextjs.org/docs/app/building-your-application/upgrading/version-15#asynchronous-page
type Params = Promise<{ ticketId: string }>;

const TicketPage = async (props: { params: Params }) => {
  const params = await props.params;
  const ticket = await getTicket(params.ticketId);

  if (!ticket) {
    return notFound();
  }

  return (
    <>
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>

      <RedirectToast />
    </>
  );
};

export default TicketPage;
