import { PrismaClient, Rate, DayOfWeek } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  await prisma.$transaction(async (tx) => {
    // 1. Subscription types (1 запрос)
    await tx.subscriptionType.createMany({
      data: [
        {
          name: "Standard Monthly",
          priceAmount: 199900,
          description: "Базовый доступ",
          rate: Rate.STANDARD,
        },
        {
          name: "Premium Monthly",
          priceAmount: 349900,
          description: "Полный доступ + бонусы",
          rate: Rate.PREMIUM,
        },
      ],
      skipDuplicates: true,
    });

    // 2. Schedule (1 запрос)
    await tx.scheduleItem.createMany({
      data: [
        // MONDAY
        {
          name: "Crossfit Morning",
          coach: "Михаил Ребров",
          time: "08:00",
          durationMinutes: 60,
          type: "Hard",
          dayOfWeek: DayOfWeek.MONDAY,
        },
        {
          name: "Yoga Recovery",
          coach: "Анна Волкова",
          time: "19:00",
          durationMinutes: 75,
          type: "Light",
          dayOfWeek: DayOfWeek.MONDAY,
        },

        // TUESDAY
        {
          name: "Body Pump",
          coach: "Елена К.",
          time: "09:00",
          durationMinutes: 50,
          type: "Medium",
          dayOfWeek: DayOfWeek.TUESDAY,
        },
        {
          name: "Stretching",
          coach: "Ольга П.",
          time: "18:30",
          durationMinutes: 45,
          type: "Relax",
          dayOfWeek: DayOfWeek.TUESDAY,
        },

        // WEDNESDAY
        {
          name: "Functional Training",
          coach: "Иван Козлов",
          time: "08:30",
          durationMinutes: 60,
          type: "Hard",
          dayOfWeek: DayOfWeek.WEDNESDAY,
        },
        {
          name: "Yoga Flow",
          coach: "Анна Волкова",
          time: "20:00",
          durationMinutes: 90,
          type: "Light",
          dayOfWeek: DayOfWeek.WEDNESDAY,
        },

        // THURSDAY
        {
          name: "Cycling Indoor",
          coach: "Сергей Л.",
          time: "07:30",
          durationMinutes: 50,
          type: "Endurance",
          dayOfWeek: DayOfWeek.THURSDAY,
        },
        {
          name: "Zumba",
          coach: "Дмитрий С.",
          time: "18:00",
          durationMinutes: 60,
          type: "Fun",
          dayOfWeek: DayOfWeek.THURSDAY,
        },

        // FRIDAY
        {
          name: "Crossfit Advanced",
          coach: "Михаил Ребров",
          time: "08:00",
          durationMinutes: 60,
          type: "Hard",
          dayOfWeek: DayOfWeek.FRIDAY,
        },
        {
          name: "Stretch & Mobility",
          coach: "Ольга П.",
          time: "17:30",
          durationMinutes: 50,
          type: "Relax",
          dayOfWeek: DayOfWeek.FRIDAY,
        },

        // SATURDAY
        {
          name: "Power Training",
          coach: "Иван Козлов",
          time: "10:00",
          durationMinutes: 60,
          type: "Hard",
          dayOfWeek: DayOfWeek.SATURDAY,
        },
        {
          name: "Yoga Flow",
          coach: "Анна Волкова",
          time: "12:00",
          durationMinutes: 90,
          type: "Light",
          dayOfWeek: DayOfWeek.SATURDAY,
        },

        // SUNDAY
        {
          name: "Light Cardio",
          coach: "Сергей Л.",
          time: "10:00",
          durationMinutes: 40,
          type: "Light",
          dayOfWeek: DayOfWeek.SUNDAY,
        },
        {
          name: "Recovery Stretching",
          coach: "Ольга П.",
          time: "18:00",
          durationMinutes: 50,
          type: "Relax",
          dayOfWeek: DayOfWeek.SUNDAY,
        },
      ],
      skipDuplicates: true,
    });
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
