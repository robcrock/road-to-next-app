import { Suspense } from "react";

import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketPage = async () => {
  const { user } = await getAuth();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"My Tickets"}
        description={"All your tickets in one place"}
      />

      <CardCompact
        className="w-full max-w-[420px] self-center"
        title={"Create Ticket"}
        description={"A new ticket will be create."}
        content={<TicketUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <TicketList userId={user?.id} />
      </Suspense>
    </div>
  );
};

export default TicketPage;
