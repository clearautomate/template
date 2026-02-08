'use server'
import { getModel } from "@/app/lib/prisma";
import { createParams } from "@/app/types/crudTable";

export async function create({ tableName, data }: createParams) {
    const model = getModel(tableName) as any;

    try {
        const result = await model.create({
            data
        })

        return {
            success: true,
            data: result
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message
        };
    }
}
