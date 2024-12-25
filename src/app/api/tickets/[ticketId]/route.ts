import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  // Read about this convention here: https://bit.ly/4hGvurc
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  return Response.json(ticket);
}
