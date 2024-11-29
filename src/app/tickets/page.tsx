import { Heading } from "@/components/heading";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";

const TicketPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Tickets Page"}
        description={"All your tickets in one place"}
      />
      <div className="flex-1 flex flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};

export default TicketPage;
