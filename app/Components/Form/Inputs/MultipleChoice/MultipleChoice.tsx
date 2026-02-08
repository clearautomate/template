import styles from './multipleChoice.module.css'

export default function MultipleChoice({ options }: { options: { label: string; value: string }[] }) {
    return (
        <div className={styles.wrapper}>
            {options.map((option, index) => (
                <label key={index}>
                    <input type="radio" name="multiple-choice" value={option.value} />
                    {option.label}
                </label>
            ))}
        </div>
    );
}