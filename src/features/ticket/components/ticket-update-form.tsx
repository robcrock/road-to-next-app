import { Ticket } from "@prisma/client";
import { Label } from "@radix-ui/react-label";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { updateTicket } from "../actions/update-ticket";

type TicketUpdateFormProps = {
  ticket: Ticket;
};

const TicketUpdateForm = ({ ticket }: TicketUpdateFormProps) => {
  const { id, title, content } = ticket;
  return (
    <form
      action={updateTicket.bind(null, id)}
      className="flex flex-col gap-y-2"
    >
      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" type="text" defaultValue={title} />
      <Label htmlFor="content">Content</Label>
      <Textarea id="content" name="content" defaultValue={content} />
      <Button type="submit">Update</Button>
    </form>
  );
};

export { TicketUpdateForm };
