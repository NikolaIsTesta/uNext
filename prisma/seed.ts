import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const file = await prisma.publicFile.upsert({
    where: { id: 1 },
    update: {
    },
    create: {
        url: 'https://nestjs-onlyup-public-bucket.s3.amazonaws.com/default.png',
        key: 'default.png'
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });