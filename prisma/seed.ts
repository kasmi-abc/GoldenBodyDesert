import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS_HASH;
  if (adminUser && adminPass) {
    const passwordHash = adminPass.startsWith("$2") ? adminPass : await bcrypt.hash(adminPass, 10);
    await prisma.adminUser.upsert({
      where: { username: adminUser },
      update: { passwordHash },
      create: { username: adminUser, passwordHash },
    });
  }
  const brand = await prisma.brand.upsert({
    where: { slug: "optimum-nutrition" },
    update: {},
    create: { slug: "optimum-nutrition", name: "Optimum Nutrition" },
  });

  const category = await prisma.category.upsert({
    where: { slug: "protein" },
    update: {},
    create: { slug: "protein", nameAr: "البروتينات", nameFr: "Protéines" },
  });

  const product = await prisma.product.upsert({
    where: { slug: "whey-gold-standard" },
    update: {},
    create: {
      slug: "whey-gold-standard",
      nameAr: "Whey Protein Gold Standard 2.5كغ",
      description: "بروتين مصل اللبن عالي الجودة",
      brandId: brand.id,
      categoryId: category.id,
      images: { create: [{ url: "/images/products/whey-gold-standard.jpg", alt: "whey" }] },
      variants: {
        create: {
          sku: "WHEY-CH-1",
          weight: "2.5كغ",
          price: 14900,
          compareAtPrice: 17000,
          stock: 12,
          expiryDate: new Date("2027-06-15"),
          batchNumber: "ON2026A12",
          warehouse: "غرداية",
        },
      },
      nutrition: {
        create: {
          servingSize: "30g",
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: "Whey Protein Concentrate, Isolate",
          warnings: "ليس دواء. استشر طبيبك.",
        },
      },
    },
  });

  console.log("seed done", product.slug);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
