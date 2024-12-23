import { Suspense } from "react";
import { SearchParams } from "nuqs/server";

import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { searchParamsCache } from "@/features/ticket/search-params";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"All Tickets"}
        description={"Tickets by everyone at one place"}
      />
      <Suspense fallback={<Spinner />}>
        {/* Below we're using nuqs to parse the search params before passing them to the ticket list. */}
        <TicketList
          searchParams={searchParamsCache.parse(await searchParams)}
        />
      </Suspense>
    </div>
  );
};

export default HomePage;
