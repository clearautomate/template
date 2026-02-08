import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './pagination.module.css';
import { PaginationState } from '../TableHeader/TableHeader';
import { Button } from '../../Button/Button';

interface Props {
    pagination: PaginationState;
}

export default function Pagination({ pagination }: Props) {
    const buttonStyles = {
        iconOnly: true,
        variant: 'foreground' as const,
        rounded: false,
        iconSize: 'xl' as const,
    }

    return (
        <div className={styles.pagination}>
            <Button
                disabled={pagination.currentPage == 1}
                onClick={() => {
                    pagination.setCurrentPage(1);
                }}
                {...buttonStyles}
            >
                <ChevronDoubleLeftIcon />
            </Button>
            <Button
                disabled={pagination.currentPage <= 1}
                onClick={() => {
                    pagination.setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
                {...buttonStyles}
            >
                <ChevronLeftIcon />
            </Button>
            <input className={styles.pageInput} type="number" min="1" max={pagination.totalPages} value={pagination.currentPage} onChange={(e) => pagination.setCurrentPage(parseInt(e.target.value) || 1)} />
            <div className={styles.text}>of {pagination.totalPages}</div>
            <Button
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={() => {
                    pagination.setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages));
                }}
                {...buttonStyles}
            >
                <ChevronRightIcon />
            </Button>
            <Button
                disabled={pagination.currentPage == pagination.totalPages}
                onClick={() => {
                    pagination.setCurrentPage(pagination.totalPages);
                }}
                {...buttonStyles}
            >
                <ChevronDoubleRightIcon />
            </Button>
            <div className={styles.text}>{pagination.totalItems} Rows</div>
        </div>
    );
}
