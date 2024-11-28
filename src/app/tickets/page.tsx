import Link from "next/link";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

const TicketPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets Page</h2>
        <p className="text-sm text-muted-foreground">
          All your tickets in one place
        </p>
      </div>
      <Separator />
      <div className="flex-1 flex flex-col items-center gap-y-4">
        {initialTickets.map((ticket) => {
          const { id, title, content, status } = ticket;

          return (
            <Card
              key={id}
              className="w-full max-w-[420px] animate-fade-in-from-top"
            >
              <CardHeader>
                <CardTitle className="flex gap-2 items-center">
                  <span>{TICKET_ICONS[status]}</span>
                  <span key={id} className="truncate">
                    {title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="line-clamp-3 whitespace-break-spaces">
                  {content}
                </span>
              </CardContent>
              <CardFooter>
                <Link href={ticketPath(id)} className="text-sm underline">
                  View
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TicketPage;
