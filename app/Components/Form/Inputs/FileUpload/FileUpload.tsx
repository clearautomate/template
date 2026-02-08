'use client'

import styles from './fileUpload.module.css'
import { useState } from 'react'

type Props = {
    allowedFileTypes?: string[]
    maxFileSizeMB?: number
    maxFiles?: number
}

export default function FileUpload({
    allowedFileTypes,
    maxFileSizeMB = 5,
    maxFiles = 3,
}: Props) {
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const files = e.target.files
        if (!files) return

        if (files.length > maxFiles) {
            setError(`Max ${maxFiles} files allowed`)
            e.target.value = ''
            return
        }

        for (const file of Array.from(files)) {
            if (file.size > maxFileSizeMB * 1024 * 1024) {
                setError(`Each file must be under ${maxFileSizeMB}MB`)
                e.target.value = ''
                return
            }
        }
    }

    return (
        <div>
            <label className={styles.wrapper}>
                <input
                    type="file"
                    hidden
                    multiple={maxFiles > 1}
                    accept={allowedFileTypes?.join(',')}
                    onChange={handleChange}
                />
                <span>Upload</span>
            </label>

            <div className={styles.meta}>
                {allowedFileTypes && (
                    <div>Supported: {allowedFileTypes.join(', ')}</div>
                )}
                <div>
                    Max size: {maxFileSizeMB}MB · Max files: {maxFiles}
                </div>
                {error && <div className={styles.error}>{error}</div>}
            </div>
        </div>
    )
}
