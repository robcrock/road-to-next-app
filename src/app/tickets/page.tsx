import Link from "next/link";

import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TicketPage = () => {
  return (
    <div>
      {initialTickets.map((ticket) => {
        const { id, title } = ticket;

        return (
          <div key={id}>
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
