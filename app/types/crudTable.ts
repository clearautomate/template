import { ModelName } from "../lib/prisma";

export interface headerCell {
    id: string;
    label: string;
    minWidth?: number;
    maxWidth?: number;
    sortable?: boolean;
    filterable?: boolean;
    fieldType: FieldType;
    // headerRender?: (value: any) => string | React.ReactNode;
    // cellRender?: (value: any) => string | React.ReactNode;
}

export type FieldType =
    | 'text'
    | 'textarea'
    | 'email'
    | 'number'
    | 'currency'
    | 'percent'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'select'
    | 'multiselect'
    | 'user'
    | 'status'

type UserValue = {
    id: string
    name: string
}

type FieldValueMap = {
    text: string
    textarea: string
    email: string
    number: number
    currency: number
    percent: number
    boolean: boolean
    date: string        // ISO date
    datetime: string    // ISO datetime
    select: string
    multiselect: string[]
    user: UserValue
    status: 'Active' | 'Inactive' | 'Pending'
}

export interface row {
    id: string;
    // value: FieldValueMap[headerCell['fieldType']];
    [key: string]: any;
}

export interface table {
    tableName: string;
    headerCell: headerCell[];
    selectableRows?: boolean;
    displayFieldTypes?: boolean;
    pageSize: number;
}

export interface readParams {
    tableName: ModelName;
    pagination?: pagination;
    sort?: sort;
}

export type sortOrder = 'asc' | 'desc';

export interface sort {
    columnId: string | null
    order: sortOrder | null
};

export interface pagination {
    page: number;
    pageSize: number;
}

export interface createParams {
    tableName: ModelName;
    data: any;
}