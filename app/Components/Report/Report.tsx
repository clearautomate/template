import styles from './report.module.css'
import {
    DocumentTextIcon,
    UsersIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

// shared color constants
const SATURATION = '75%'
const LIGHTNESS_BG = '75%'
const LIGHTNESS_ICON = '20%'

const stats = [
    {
        value: '9',
        label: 'Reports Generated',
        icon: DocumentTextIcon,
        hue: 240,
    },
    {
        value: '15',
        label: 'Active Users',
        icon: UsersIcon,
        hue: 0,
    },
    {
        value: '23%',
        label: 'Growth Rate',
        icon: ArrowTrendingUpIcon,
        hue: 120,
    },
]

export default function Report() {
    return (
        <div className={styles.container}>
            {stats.map(({ value, label, icon: Icon, hue }) => (
                <div key={label} className={styles.stat}>
                    <div
                        className={styles.iconWrapper}
                        style={{
                            background: `hsl(${hue}, ${SATURATION}, ${LIGHTNESS_BG})`,
                            color: `hsl(${hue}, ${SATURATION}, ${LIGHTNESS_ICON})`,
                        }}
                    >
                        <Icon className={styles.icon} />
                    </div>

                    <div>
                        <h2>{value}</h2>
                        <p>{label}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
