import { row } from "@/app/types/crudTable";
import { Button } from "../../Button/Button";
import Filter from "../Filter/Filter";
import styles from './actions.module.css'

export interface ActionsProps {
    rows: {
        rows: row[];
        setRows: React.Dispatch<React.SetStateAction<row[]>>;
    }
}

export default function Actions({ rows }: ActionsProps) {
    const handleAddNewRow = () => {

        const newRow: row = {
            id: 'AUTO_GENERATED_ID_' + Math.random().toString(36).substr(2, 9),
            // Initialize other properties as needed
        };
        console.log('Adding new row:', newRow);
        rows.setRows([newRow, ...rows.rows]);
    }

    return (
        <div className={styles.container}>
            <Filter />
            <Button onClick={handleAddNewRow}>
                Add New
            </Button>
        </div>
    );
}