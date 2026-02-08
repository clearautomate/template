import styles from './checkbox.module.css'

export default function Checkbox({ id, checked, onChange }: { id: string; checked?: boolean; onChange?: (checked: boolean) => void }) {
    return (
        <div className={styles.checkboxWrapper}>
            <input id={id} className={styles.checkbox} type="checkbox" aria-hidden="true" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
            <label htmlFor={id}></label>
        </div>
    )
}