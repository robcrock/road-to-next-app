import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from the database.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499, // It's a best practice to use cents 4.99
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from the database.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from the database.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
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
