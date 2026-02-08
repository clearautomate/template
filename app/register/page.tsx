'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './register.module.css'

export default function Page() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (password.length < 8) {
            setError('Password must be at least 8 characters.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
            setError(data.error ?? 'Registration failed')
            return
        }

        // optional: send them to login after successful registration
        router.push('/login')
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Register</h2>

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

                <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm Password
                    <input
                        className={styles.textInput}
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>

                {error && <p className={styles.error}>{error}</p>}

                <button className={styles.button} type="submit">
                    Create Account
                </button>
            </form>
        </div>
    )
}
