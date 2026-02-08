'use client'

import styles from './dropdown.module.css'

interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function Dropdown({ options, value, onChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
