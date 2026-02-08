'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './login.module.css'

export default function Page() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const searchParams = useSearchParams()
    const next = searchParams.get('next') ?? '/dashboard'

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
            setError(data.error ?? 'Invalid username or password')
            return
        }

        router.push(next)
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <label htmlFor="username" className={styles.label}>
                    Username
                    <input
                        className={styles.textInput}
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>

                <label htmlFor="password" className={styles.label}>
                    Password
                    <input
                        className={styles.textInput}
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.button} type="submit">
                    Login
                </button>
            </form>
        </div>
    )
}
