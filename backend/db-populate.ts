
import { db } from "./src/prisma/db.ts";

async function main() {
  await db.orm.public.Expense.create({
    id: 1,
    date: "2025-01-16",
    description: "Example expense #1 from Alice",
    payer: "Alice",
    amount: 25.5,
  });

  console.log("Expense created successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

