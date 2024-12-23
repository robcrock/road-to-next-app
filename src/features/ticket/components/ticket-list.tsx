import { Placeholder } from "@/components/placeholder";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";

import { getTickets } from "../queries/get-tickets";
import { SearchParams } from "../search-params";

import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
  searchParams: SearchParams;
};

const TicketList = async ({ userId, searchParams }: TicketListProps) => {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="max-w-[420px] w-full">
        <div className="flex gap-x-2">
          <SearchInput placeholder="Search tickets...." />
          <SortSelect
            defaultValue={"newest"}
            options={[
              { label: "Newest", value: "newest" },
              { label: "Bounty", value: "bounty" },
            ]}
          />
        </div>
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}
    </div>
  );
};

export { TicketList };
