import { initialTickets } from "@/data";

type Params = Promise<{ ticketId: string }>;

const TicketPage = async ({ params }: { params: Params }) => {
  const { ticketId } = await params;

  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket) {
    return <div>Ticket not found</div>;
  }

  return (
    <div>
      <h2 className="text-lg">{ticket.title}</h2>
      <p className="text-sm">{ticket.content}</p>
      <p>Status: {ticket.status}</p>
    </div>
  );
};

export default TicketPage;
