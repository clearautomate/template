export interface Form {
    title: string;
    description?: string;
    imageUrl?: string;
    sections: FormSection[];
}

export interface FormSection {
    title?: string;
    description?: string;
    fields: FormFieldType[];
}

export interface FormFieldType {
    label: string;
    imageUrl?: string;
    fieldType: FieldType;
    required?: boolean;
}

export type FieldType =
    | {
        fieldType: 'MULTIPLE_CHOICE' | 'DROPDOWN';
        options: {
            label: string;
            value: string;
        }[];
    } |
    {
        fieldType: 'CHECKBOXES';
        options: {
            label: string;
        }[];
    } |
    {
        fieldType: 'FILE_UPLOAD';
        allowedFileTypes?: string[];
        maxFileSizeMB?: number;
        maxFiles?: number;
    } | {
        fieldType: 'MULTIPLE_CHOICE_GRID';
        options: {
            rows: {
                label: string;
                value: string
            }[];
            columns: {
                label: string;
                value: string
            }[];
        }
    } | {
        fieldType: 'RATING';
        options: {
            maxRating: number;
        }
    }
    | {
        fieldType: 'CHECKBOX_GRID';
        options: {
            rows: {
                label: string;
                value: string;
            }[];
            columns: {
                label: string;
                value: string;
            }[];
        };
    } | {
        fieldType:
        | 'SHORT_TEXT' | 'LONG_TEXT';
        maxLength?: number;
        minLength?: number;
        regexPattern?: string;
        customErrorMessage?: string;
    }
    | {
        fieldType:
        | 'DATE'
        | 'TIME';
    };
