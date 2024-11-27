import Link from "next/link";

import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICON = {
  OPEN: "O",
  DONE: "X",
  IN_PROGRESS: ">",
};

const TicketPage = () => {
  return (
    <div>
      {initialTickets.map((ticket) => {
        const { id, title } = ticket;

        return (
          <div key={id}>
            <div>{TICKET_ICON[ticket.status]}</div>
            <h2 key={id} className="text-lg">
              {title}
            </h2>
            <Link href={ticketPath(id)} className="text-sm underline">
              View
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TicketPage;
