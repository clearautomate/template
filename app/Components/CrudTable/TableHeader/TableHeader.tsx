import { Dispatch, SetStateAction } from 'react';
import styles from './tableHeader.module.css';
import Pagination from './Pagination';
import Actions from './Actions';
import { headerCell, row } from '@/app/types/crudTable';
import Filters from '../Filters/Filters';

export interface PaginationState {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    pageSize: number;
    totalPages: number;
    totalItems?: number;
}

export interface SelectionState {
    selectedRows: string[];
    setSelectedRows: Dispatch<SetStateAction<string[]>>;
}

export interface EditState {
    editMode: boolean;
    setEditMode: Dispatch<SetStateAction<boolean>>;
}

export interface RowsState {
    rows: row[];
    setRows: Dispatch<SetStateAction<row[]>>;
}

interface Props {
    tableName: string;
    rows: RowsState;
    headerCells: headerCell[];
    pagination?: PaginationState;
    selection?: SelectionState;
    edit?: EditState;
}

export default function TableHeader({ rows, tableName, headerCells = [], pagination, selection, edit }: Props) {
    return (
        <div className={styles.container}>
            <h2>{tableName}</h2>

            <div className={`${styles.actionsRow} ${styles.loading}`}>
                <Actions rows={rows} selection={selection} edit={edit} />
            </div>
        </div>
    );
}
