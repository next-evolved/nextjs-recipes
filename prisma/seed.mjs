// prisma/seed.mjs
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Passw0rd!", 10);
  await prisma.user.upsert({
    where: { email: "user@nextmail.com" },
    update: {},
    create: { email: "user@nextmail.com", name: "Test User", passwordHash },
  });
}

main().finally(() => prisma.$disconnect());
