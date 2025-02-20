import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.articleCategory.createMany({
    data: [
      { name: "Technology" },
      { name: "Health" },
      { name: "Science" },
      { name: "Business" },
      { name: "Sports" },
      { name: "Entertainment" },
    ],
    skipDuplicates: true,
  });

  console.log("Categories seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
