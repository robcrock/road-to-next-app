import { Suspense } from "react";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { TicketCreateForm } from "@/features/ticket/components/ticket-create-form";
import { TicketList } from "@/features/ticket/components/ticket-list";

const TicketPage = async () => (
  <div className="flex-1 flex flex-col gap-y-8">
    <Heading
      title={"Tickets Page"}
      description={"All your tickets in one place"}
    />

    <CardCompact
      className="w-full max-w-[420px] self-center"
      title={"Create Ticket"}
      description={"A new ticket will be create."}
      content={<TicketCreateForm />}
    />

    <Suspense fallback={<Spinner />}>
      <TicketList />
    </Suspense>
  </div>
);

export default TicketPage;
