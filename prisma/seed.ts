import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Seeding started...");

  await prisma.ticket.deleteMany();

  // Instead of createMany, we'll create tickets one by one with a delay
  for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
    // Add a small delay between creations (e.g., 1000ms)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const t1 = performance.now();
  console.log(`Seeding completed in ${t1 - t0} milliseconds.`);
};

seed();
