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
      { name: "Politics" },
      { name: "Travel" },
      { name: "Food" },
      { name: "Fashion" },
      { name: "Gaming" },
      { name: "Music" },
      { name: "Education" },
      { name: "Religion" },
      { name: "Environment" },
      { name: "Culture" },
      { name: "History" },
      { name: "Art" },
      { name: "Finance" },
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
