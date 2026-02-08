// filters.ts

export type LogicalOperator = "AND" | "OR";

export type Primitive = string | number | boolean | Date | null;

// --- UI operators ---
export type FilterOperator =
    | "equals"
    | "not"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "in"
    | "notIn"
    | "lt"
    | "lte"
    | "gt"
    | "gte"
    | "isNull"
    | "isNotNull";

// --- Field kinds (helps parsing/validations) ---
export type FieldKind = "string" | "number" | "boolean" | "date";

export type FieldConfig = {
    kind: FieldKind;
    nullable?: boolean;
    caseInsensitive?: boolean; // applies to string ops
};

export type FieldConfigMap<TFields extends string> = Record<TFields, FieldConfig>;

// --- UI state ---
export type FilterRow<TField extends string = string> = {
    id: string;
    field: TField;
    op: FilterOperator;
    value?: unknown;
};

export type FilterGroup<TField extends string = string> = {
    id: string;
    join: LogicalOperator;
    filters: FilterRow<TField>[];
    groups?: FilterGroup<TField>[];
};

export type FiltersState<TField extends string = string> = {
    root: FilterGroup<TField>;
};

// --- Prisma-like typing (TYPE ONLY) ---
export type FieldFilter<TField> =
    | { equals?: TField }
    | { not?: TField | null }
    | { in?: TField[] }
    | { notIn?: TField[] }
    | (TField extends number | Date
        ? { lt?: TField; lte?: TField; gt?: TField; gte?: TField }
        : {})
    | (TField extends string
        ? {
            contains?: string;
            startsWith?: string;
            endsWith?: string;
            mode?: "insensitive";
        }
        : {});

export type WhereInput<TModel extends Record<string, any>> =
    // logical operators
    {
        AND?: WhereInput<TModel>[];
        OR?: WhereInput<TModel>[];
        NOT?: WhereInput<TModel>[];
    }
    // field filters (mapped type must be in a type alias, not interface)
    & {
        [K in keyof TModel]?: FieldFilter<TModel[K]>;
    };

// --- Builder ---
export type BuildWhereOptions = {
    dropInvalid?: boolean; // default true
};

export function buildWhere<
    TModel extends Record<string, any>,
    TField extends keyof TModel & string
>(
    state: FiltersState<TField>,
    fields: FieldConfigMap<TField>,
    options: BuildWhereOptions = {}
): WhereInput<TModel> {
    const dropInvalid = options.dropInvalid ?? true;

    const node = buildGroupWhere<TModel, TField>(state.root, fields, dropInvalid);
    return (node ?? {}) as WhereInput<TModel>;
}

// ---------- internals ----------
function buildGroupWhere<
    TModel extends Record<string, any>,
    TField extends keyof TModel & string
>(
    group: FilterGroup<TField>,
    fields: FieldConfigMap<TField>,
    dropInvalid: boolean
): WhereInput<TModel> | null {
    const parts: WhereInput<TModel>[] = [];

    for (const f of group.filters ?? []) {
        const part = buildFilterWhere<TModel, TField>(f, fields, dropInvalid);
        if (part) parts.push(part);
    }

    for (const g of group.groups ?? []) {
        const part = buildGroupWhere<TModel, TField>(g, fields, dropInvalid);
        if (part) parts.push(part);
    }

    if (parts.length === 0) return null;
    if (parts.length === 1) return parts[0];

    return group.join === "AND"
        ? ({ AND: parts } as WhereInput<TModel>)
        : ({ OR: parts } as WhereInput<TModel>);
}

function buildFilterWhere<
    TModel extends Record<string, any>,
    TField extends keyof TModel & string
>(
    filter: FilterRow<TField>,
    fields: FieldConfigMap<TField>,
    dropInvalid: boolean
): WhereInput<TModel> | null {
    const cfg = fields[filter.field];
    if (!cfg) return dropOrNull(dropInvalid);

    const fieldKey = filter.field as keyof TModel;

    // null checks
    if (filter.op === "isNull") {
        return { [fieldKey]: { equals: null } } as WhereInput<TModel>;
    }
    if (filter.op === "isNotNull") {
        return { [fieldKey]: { not: null } } as WhereInput<TModel>;
    }

    // parse value(s)
    const parsed = parseValue(filter.value, cfg, filter.op);
    if (parsed === INVALID) return dropOrNull(dropInvalid);

    // runtime object (NOT using FieldFilter as a value)
    const fieldWhere = opToPrismaFilter(filter.op, parsed, cfg);
    if (!fieldWhere) return dropOrNull(dropInvalid);

    return { [fieldKey]: fieldWhere } as WhereInput<TModel>;
}

const INVALID = Symbol("INVALID");

function parseValue(
    raw: unknown,
    cfg: FieldConfig,
    op: FilterOperator
): Primitive | Primitive[] | typeof INVALID {
    if (op === "in" || op === "notIn") {
        const arr = Array.isArray(raw)
            ? raw
            : typeof raw === "string"
                ? splitCsv(raw)
                : null;

        if (!arr) return INVALID;

        const parsedArr = arr
            .map((v) => parseSingle(v, cfg))
            .filter((v): v is Primitive => v !== INVALID);

        return parsedArr.length ? parsedArr : INVALID;
    }

    return parseSingle(raw, cfg);
}

function parseSingle(raw: unknown, cfg: FieldConfig): Primitive | typeof INVALID {
    if (raw === undefined) return INVALID;

    if (raw === null) return cfg.nullable ? null : INVALID;

    switch (cfg.kind) {
        case "string":
            if (typeof raw === "string") return raw;
            if (typeof raw === "number" || typeof raw === "boolean") return String(raw);
            return INVALID;

        case "number":
            if (typeof raw === "number" && Number.isFinite(raw)) return raw;
            if (typeof raw === "string") {
                const n = Number(raw);
                return Number.isFinite(n) ? n : INVALID;
            }
            return INVALID;

        case "boolean":
            if (typeof raw === "boolean") return raw;
            if (typeof raw === "string") {
                const s = raw.trim().toLowerCase();
                if (s === "true" || s === "1" || s === "yes") return true;
                if (s === "false" || s === "0" || s === "no") return false;
            }
            return INVALID;

        case "date":
            if (raw instanceof Date && !Number.isNaN(raw.getTime())) return raw;
            if (typeof raw === "string" || typeof raw === "number") {
                const d = new Date(raw);
                return Number.isNaN(d.getTime()) ? INVALID : d;
            }
            return INVALID;

        default:
            return INVALID;
    }
}

function opToPrismaFilter(
    op: FilterOperator,
    value: Primitive | Primitive[],
    cfg: FieldConfig
): Record<string, any> | null {
    switch (op) {
        case "equals":
            return { equals: value };

        case "not":
            return { not: value };

        case "contains":
            if (cfg.kind !== "string" || typeof value !== "string") return null;
            return cfg.caseInsensitive
                ? { contains: value, mode: "insensitive" }
                : { contains: value };

        case "startsWith":
            if (cfg.kind !== "string" || typeof value !== "string") return null;
            return cfg.caseInsensitive
                ? { startsWith: value, mode: "insensitive" }
                : { startsWith: value };

        case "endsWith":
            if (cfg.kind !== "string" || typeof value !== "string") return null;
            return cfg.caseInsensitive
                ? { endsWith: value, mode: "insensitive" }
                : { endsWith: value };

        case "in":
            if (!Array.isArray(value)) return null;
            return { in: value };

        case "notIn":
            if (!Array.isArray(value)) return null;
            return { notIn: value };

        case "lt":
            return { lt: value };

        case "lte":
            return { lte: value };

        case "gt":
            return { gt: value };

        case "gte":
            return { gte: value };

        default:
            return null;
    }
}

function dropOrNull(_dropInvalid: boolean): null {
    // If you want strict mode, you can throw here instead.
    return null;
}

function splitCsv(s: string): string[] {
    return s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
}
