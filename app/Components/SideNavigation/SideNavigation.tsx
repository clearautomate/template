'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './sideNavigation.module.css'

import {
    HomeIcon,
    UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ClipboardDocumentListIcon,
    BellIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    FolderIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ArrowRightEndOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Button } from '../Button/Button'
import Image from 'next/image'

const links = [
    { label: 'Dashboard', href: '/', icon: HomeIcon },
    { label: 'Form', href: '/form', icon: ClipboardDocumentListIcon },
    { label: 'Users', href: '/users', icon: UsersIcon },
    { label: 'Reports', href: '/reports', icon: ChartBarIcon },
    { label: 'Tasks', href: '/tasks', icon: ClipboardDocumentListIcon },
    { label: 'Documents', href: '/documents', icon: FolderIcon },
    { label: 'Billing', href: '/billing', icon: CreditCardIcon },
    { label: 'Notifications', href: '/notifications', icon: BellIcon },
    { label: 'Audit Logs', href: '/audit-logs', icon: ShieldCheckIcon },
    { label: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function SideNavigation({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [navOpen, setNavOpen] = useState(true);
    const navWidth = navOpen ? '250px' : '75px';

    return (
        <>
            <div className={styles.navWrapper} style={{ width: navWidth }}>
                <div className={styles.toggleButtonWrapper} style={{ flexDirection: navOpen ? 'row' : 'column' }}>
                    <Image
                        src="/clear-automate-logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                    />
                    <Button variant='foreground' iconOnly iconSize='lg' onClick={() => setNavOpen(!navOpen)}>
                        {navOpen ? <ChevronDoubleLeftIcon /> : <ChevronDoubleRightIcon />}
                    </Button>
                </div>
                <div className={styles.logoWrapper}>
                    <img
                        src="https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-multicolor-swirls-circle-logo.png"
                        alt="Logo"
                    />
                    {navOpen && <p>Prisma Circle</p>}
                </div>

                <div className={styles.linksWrapper}>
                    {links.map(({ label, href, icon: Icon }) => {
                        const isActive =
                            pathname === href || pathname.startsWith(`${href}/`)

                        return (
                            <Link
                                key={href}
                                href={href}
                                style={navOpen ? {} : { justifyContent: 'center' }}
                                className={`${styles.link} ${isActive ? styles.activeLink : ''
                                    }`}
                            >
                                <Icon className={styles.icon} />
                                {navOpen && <span>{label}</span>}
                            </Link>
                        )
                    })}
                </div>

                <div className={styles.profileWrapper}>
                    <img
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                        alt="User Profile"
                        className={styles.profileImg}
                    />
                    <div>
                        <p className={styles.profileLabel}>John Doe</p>
                        <p className={styles.profileRole}>Administrator</p>
                    </div>
                </div>

                <div className={styles.logoutWrapper}>
                    <Button variant="primary" fullWidth iconOnly={!navOpen}>
                        <ArrowRightEndOnRectangleIcon />
                        {navOpen && <span>Logout</span>}
                    </Button>
                </div>
            </div>
            <div style={{ marginLeft: navWidth }}>
                {children}
            </div>
        </>
    )
}
