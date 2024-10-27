const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'yamada@example.com' },
    update: {
      name: '山田 太郎', // 必要に応じて更新内容を記載
    },
    create: {
      name: '山田 太郎',
      email: 'yamada@example.com',
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
