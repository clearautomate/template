import { row, headerCell, FieldType } from '../../../types/crudTable';

import styles from './tableCell.module.css'

interface Props {
    selectedRows: string[];
    value: any;
    header: headerCell;
    isEditMode?: boolean;
}

// type FieldType =
// | 'text'
// | 'textarea'
// | 'email'
// | 'number'
// | 'currency'
// | 'percent'
// | 'boolean'
// | 'date'
// | 'datetime'
// | 'select'
// | 'multiselect'
// | 'user'
// | 'status'

export function TableCell({ selectedRows, value, header, isEditMode }: Props) {
    const safeValue = value ?? '';

    const isDate = (value: unknown): value is Date => {
        return value instanceof Date && !isNaN(value.getTime());
    };

    const renderCell = () => {
        switch (header.fieldType) {
            case 'text':
                return <input className={styles.textInput} value={safeValue} readOnly disabled={!isEditMode}></input>;

            case 'textarea':
                return <input className={styles.textInput} value={safeValue} readOnly disabled={!isEditMode}></input>;

            case 'email':
                return <input className={styles.textInput} value={safeValue} readOnly disabled={!isEditMode}></input>;

            case 'number':
                return <input className={styles.textInput} value={Number(safeValue)} readOnly disabled={!isEditMode}></input>;

            case 'currency':
                return <input className={styles.textInput} value={`$${Number(safeValue).toFixed(2)}`} readOnly disabled={!isEditMode}></input>;

            case 'percent':
                return <>{safeValue}</>;

            case 'boolean':
                return <>{safeValue}</>;

            case 'date':
                return <>{isDate(safeValue) ? safeValue.toISOString().split('T')[0] : safeValue}</>;

            case 'datetime':
                return <>{isDate(safeValue) ? safeValue.toISOString().split('T')[0] : safeValue}</>;

            case 'select':
                return <>{safeValue}</>;

            case 'multiselect':
                return <>{safeValue}</>;

            case 'user':
                return <>{safeValue}</>;

            case 'status':
                return <>{safeValue}</>;

            default:
                return <input className={styles.textInput} value={safeValue} readOnly disabled={!isEditMode}></input>;
        }
    };

    return (
        <td
        // key={header.id}
        // className={selectedRows.includes(rows.id) ? styles.activeRow : ''}
        // style={{
        //     minWidth: header.minWidth,
        //     maxWidth: header.maxWidth ?? 'max-content',
        // }}
        >
            {renderCell()}
        </td>
    );
}