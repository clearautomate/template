// Actions.tsx
import { Dispatch, SetStateAction, useState } from 'react';
import styles from './tableHeader.module.css';
import { ArrowDownTrayIcon, ArrowPathIcon, CheckIcon, FunnelIcon, PencilSquareIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Filters from '../Filters/Filters';
import { row } from '@/app/types/crudTable';
import { RowsState } from './TableHeader';

interface ActionsProps {
    rows: RowsState;
    selection?: {
        selectedRows: string[];
        setSelectedRows: Dispatch<SetStateAction<string[]>>;
    };
    edit?: {
        editMode: boolean;
        setEditMode: Dispatch<SetStateAction<boolean>>;
    };
}

export default function Actions({ rows, selection, edit }: ActionsProps) {
    const selectedCount = selection?.selectedRows?.length;
    const [confirm, setConfirm] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    const handleAddRow = () => {
        const newRow = {} as row;
        rows.setRows((prev) => {
            return [newRow, ...prev];
        });
    }

    return (
        <div className={styles.actions}>
            {/* Confirm */}
            {confirm ? (
                <>
                    <p className={styles.squareText}>Confirm</p>

                    {/* Confirm */}
                    <button
                        className={styles.iconBtn}
                        onClick={() =>
                            console.log('Edit clicked. Selected:', selection?.selectedRows)
                        }
                    >
                        <CheckIcon />
                    </button>

                    {/* Cancel */}
                    <button
                        className={styles.iconBtn}
                        onClick={() =>
                            console.log('Edit clicked. Selected:', selection?.selectedRows)
                        }
                    >
                        <XMarkIcon />
                    </button>
                </>
            ) : (
                <>
                    {/* Filter */}
                    <button
                        className={styles.iconBtn}
                        onClick={() =>
                            setFilterOpen(!filterOpen)}
                    >
                        <FunnelIcon />
                    </button>

                    <Filters isOpen={filterOpen} />

                    {/* Edit */}
                    <button
                        className={styles.iconBtn}
                        disabled={!edit}
                        onClick={() => {
                            setConfirm(true);
                            console.log('Edit clicked. Selected:', selection?.selectedRows)
                        }}
                    >
                        <PencilSquareIcon />
                    </button>

                    {/* Delete */}
                    <button
                        className={styles.iconBtn}
                        disabled={!selection || selectedCount === 0}
                        onClick={() => {
                            setConfirm(true);
                            console.log('Delete clicked. Selected:', selection?.selectedRows);
                        }}
                    >
                        <TrashIcon />
                    </button>

                    {/* Download */}
                    <button
                        className={styles.iconBtn}
                        onClick={() => {
                            setConfirm(true);
                            console.log('Delete clicked. Selected:', selection?.selectedRows);
                        }}
                    >
                        <ArrowDownTrayIcon />
                    </button>

                    {/* Refresh */}
                    <button
                        className={styles.iconBtn}
                        onClick={() => {
                            // example: you can open confirm modal here
                            console.log('Delete clicked. Selected:', selection?.selectedRows);
                        }}
                    >
                        <ArrowPathIcon />
                    </button>

                    {/* Add */}
                    <button
                        className={styles.iconBtn}
                        onClick={() => {
                            handleAddRow();
                            setConfirm(true);
                        }}
                    >
                        <PlusIcon />
                    </button>
                </>
            )}
        </div>
    );
}
