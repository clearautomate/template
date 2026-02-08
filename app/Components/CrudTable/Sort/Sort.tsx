'use client';

import { useEffect, useRef, useState } from 'react';
import {
    ArrowDownIcon,
    ArrowUpIcon,
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    ChevronDownIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import styles from './sort.module.css';
import type { sort as SortType } from '@/app/types/crudTable';

interface Props {
    sort: SortType;
    setSort: React.Dispatch<React.SetStateAction<SortType>>;
    headerId: string;
}

export default function Sort({ sort, setSort, headerId }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isActive = sort?.columnId === headerId;
    const order = isActive ? sort?.order : null;

    const setAsc = () => {
        setSort({ columnId: headerId, order: 'asc' });
        setIsOpen(false);
    };

    const setDesc = () => {
        setSort({ columnId: headerId, order: 'desc' });
        setIsOpen(false);
    };

    const clearSort = () => {
        setSort({ columnId: null as any, order: null as any });
        setIsOpen(false);
    };

    const showBoth = !isActive || order == null;
    const showAsc = showBoth || order === 'desc';
    const showDesc = showBoth || order === 'asc';

    // 👇 CLOSE ON CLICK OUTSIDE
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div ref={containerRef} className={styles.container}>
            {isActive && order && (
                order === 'asc'
                    ? <ArrowUpIcon className={styles.sortIcon} />
                    : <ArrowDownIcon className={styles.sortIcon} />
            )}

            <button
                type="button"
                className={styles.sortIconBtn}
                onClick={() => setIsOpen(v => !v)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
            >
                <ChevronDownIcon className={styles.sortIcon} />
            </button>

            {isOpen && (
                <div className={styles.sortMenu} role="menu">
                    {showAsc && (
                        <button type="button" onClick={setAsc} role="menuitem">
                            <BarsArrowUpIcon className={styles.sortIcon} />
                            <span className={styles.sortButtonText}>Sort Ascending</span>
                        </button>
                    )}

                    {showDesc && (
                        <button type="button" onClick={setDesc} role="menuitem">
                            <BarsArrowDownIcon className={styles.sortIcon} />
                            <span className={styles.sortButtonText}>Sort Descending</span>
                        </button>
                    )}

                    {isActive && order && (
                        <button
                            type="button"
                            onClick={clearSort}
                            role="menuitem"
                            className={styles.danger}
                        >
                            <XMarkIcon className={styles.sortIcon} />
                            <span className={styles.sortButtonText}>Clear sorting</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
