import { initialTickets } from "@/data";

type TicketPageProps = {
  params: { ticketId: string };
};

const TicketPage = ({ params }: TicketPageProps) => {
  const { ticketId } = params;

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
