import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || 'file:./dev.db'
})

export const prisma = new PrismaClient({ adapter })

export const models = {
    user: prisma.user,
    test: prisma.fieldValue,
} as const;

export type ModelName = keyof typeof models;

export function getModel<T extends ModelName>(name: T) {
    return models[name];
}