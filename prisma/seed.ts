import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "user",
    // Use your own email
    email: "rcrocker13@gmail.com",
  },
];
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

const comments = [
  {
    content: "This is the first comment from the database.",
  },
  {
    content: "This is the second comment from the database.",
  },
  {
    content: "This is the third comment from the database.",
  },
];

const seed = async () => {
  /*
    Cleaning up our database

    Note: We have to delete the tickets before the users 
      otherwise we would have tikets without users and that
      would violate the foreign key constraint.

    Caveat: The note above is only valid if we aren't using
      referential actions like CASCADE or SET NULL.
  */
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("secret");

  // Creating users with the same password
  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({
      ...user,
      passwordHash,
    })),
  });

  // Creating tickets for the admin user
  const dbTickets = await prisma.ticket.createManyAndReturn({
    data: tickets.map((ticket) => ({
      ...ticket,
      userId: dbUsers[0].id,
    })),
  });

  // Creating comments for the admin user
  await prisma.comment.createMany({
    data: comments.map((comment) => ({
      ...comment,
      // This is relating our comments to one of the users and
      // one of the tickets
      userId: dbUsers[0].id,
      ticketId: dbTickets[0].id,
    })),
  });
};

seed();
