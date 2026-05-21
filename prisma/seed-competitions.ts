// prisma/seed-competitions.ts
// Run: npx tsx prisma/seed-competitions.ts

import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { competitions } from "./data/competitions"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding competitions & platforms...")

  for (const entry of competitions) {
    await prisma.activity.upsert({
      where: { slug: entry.slug },
      update: {
        name: entry.name,
        description: entry.description,
        category: entry.category,
        gradeLevels: entry.gradeLevels,
        financialSupport: entry.financialSupport,
        entryPrice: entry.entryPrice ?? null,
        scholarshipAmount: entry.scholarshipAmount ?? null,
        amountCurrency: entry.amountCurrency ?? "TRY",
        isPrestigious: entry.isPrestigious,
        isClosed: entry.isClosed,
        season: entry.season,
        duration: entry.duration,
        deadline: entry.deadline,
        location: entry.location,
        requirements: entry.requirements,
        website: entry.website,
        imageUrl: entry.imageUrl,
      },
      create: {
        name: entry.name,
        slug: entry.slug,
        description: entry.description,
        category: entry.category,
        gradeLevels: entry.gradeLevels,
        financialSupport: entry.financialSupport,
        entryPrice: entry.entryPrice ?? null,
        scholarshipAmount: entry.scholarshipAmount ?? null,
        amountCurrency: entry.amountCurrency ?? "TRY",
        isPrestigious: entry.isPrestigious,
        isClosed: entry.isClosed,
        season: entry.season,
        duration: entry.duration,
        deadline: entry.deadline,
        location: entry.location,
        requirements: entry.requirements,
        website: entry.website,
        imageUrl: entry.imageUrl,
      },
    })
  }

  console.log(`Seeded ${competitions.length} competitions/platforms successfully!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
