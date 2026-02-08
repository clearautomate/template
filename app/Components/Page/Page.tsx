import styles from './page.module.css'

export default function Page({ title, description, children }: { title: string, description: string, children?: React.ReactNode }) {
    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
