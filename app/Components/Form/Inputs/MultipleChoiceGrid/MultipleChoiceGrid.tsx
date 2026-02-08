import styles from './multipleChoiceGrid.module.css'

export default function MultipleChoiceGrid({
    rows,
    columns,
}: {
    rows: { label: string; value: string }[];
    columns: { label: string; value: string }[];
}) {
    return (
        <div className={styles.mcGrid}>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((col) => (
                            <th key={col.value}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.value}>
                            <td>{row.label}</td>
                            {columns.map((col) => (
                                <td key={col.value}>
                                    <input type="radio" name={row.value} value={col.value} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
