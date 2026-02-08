import { prisma } from "@/app/lib/prisma";
import { faker } from "@faker-js/faker";

async function main() {
    const users = await prisma.user.findMany();

    const totalRows = 100;

    for (let i = 0; i < totalRows; i++) {
        await prisma.fieldValue.create({
            data: {
                // ───────── TEXT TYPES ─────────
                textValue: faker.word.words(3),
                textareaValue: faker.lorem.paragraph(),
                emailValue: faker.internet.email(),

                // ───────── NUMERIC TYPES ─────────
                numberValue: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
                currencyValue: faker.number.float({ min: 10, max: 5000, fractionDigits: 2 }),
                percentValue: faker.number.float({ min: 0, max: 100, fractionDigits: 2 }),

                // ───────── BOOLEAN ─────────
                booleanValue: faker.datatype.boolean(),

                // ───────── DATE TYPES ─────────
                dateValue: faker.date.past(),
                datetimeValue: faker.date.recent(),

                // ───────── SELECT TYPES ─────────
                selectValue: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
                multiselectValue: faker.helpers.arrayElement([
                    "Red,Blue",
                    "Small,Medium",
                    "Option A,Option C",
                ]),

                // ───────── RELATION TYPES ─────────
                userId: users.length ? faker.helpers.arrayElement(users).id : null,

                // ───────── STATUS ─────────
                statusValue: faker.helpers.arrayElement(["active", "inactive", "archived"]),
            },
        });
    }

    console.log("✅ FieldValue seed completed (fully filled rows)");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
