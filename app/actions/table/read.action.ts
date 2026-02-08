'use server'
import { models, ModelName, getModel } from "@/app/lib/prisma";
import { pagination, readParams, sort } from "@/app/types/crudTable";

export async function read({ tableName, pagination = { page: 1, pageSize: 50 }, sort }: readParams) {
    const model = getModel(tableName) as any;

    const [rows, totalItems] = await Promise.all([
        model.findMany({
            skip: (pagination.page - 1) * pagination.pageSize,
            take: pagination.pageSize,
            orderBy: sort?.columnId
                ? {
                    [sort.columnId]: {
                        sort: sort.order,
                        nulls: 'last',
                    },
                }
                : undefined,
        }),
        model.count(),
    ]);

    return {
        rows,
        pagination: {
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pagination.pageSize),
        },
    };

}
