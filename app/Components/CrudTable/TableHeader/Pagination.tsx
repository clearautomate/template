import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import styles from './tableHeader.module.css';
import { PaginationState } from './TableHeader';
import page from '@/app/form/page';

interface Props {
    pagination: PaginationState;
}

type PageItem = number | '…';

export default function Pagination({ pagination }: Props) {
    return (
        <div className={styles.pagination}>
            <button
                className={styles.iconBtn}
                disabled={pagination.currentPage == 1}
                onClick={() => {
                    pagination.setCurrentPage(1);
                }}
            >
                <ChevronDoubleLeftIcon />
            </button>
            <button
                className={styles.iconBtn}
                disabled={pagination.currentPage <= 1}
                onClick={() => {
                    pagination.setCurrentPage((prev) => Math.max(prev - 1, 1));
                }}
            >
                <ChevronLeftIcon />
            </button>

            <input className={styles.pageInput} type="number" min="1" max={pagination.totalPages} value={pagination.currentPage} onChange={(e) => pagination.setCurrentPage(parseInt(e.target.value) || 1)} />

            <div className={styles.squareText}>of {pagination.totalPages}</div>

            {/* {items.map((item, idx) =>
                item === '…' ? (
                    <p key={`dots-${idx}`} className={styles.squareText}>
                        …
                    </p>
                ) : (
                    <button
                        key={item}
                        className={`${styles.iconBtn} ${item === pagination.currentPage ? styles.primaryBtn : ''
                            }`}
                        disabled={item === pagination.currentPage}
                        onClick={() => {
                            pagination.setCurrentPage(item as number);
                        }}
                    >
                        {item}
                    </button>
                )
            )} */}

            <button
                className={styles.iconBtn}
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={() => {
                    pagination.setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages));
                }}
            >
                <ChevronRightIcon />
            </button>
            <button
                className={styles.iconBtn}
                disabled={pagination.currentPage == pagination.totalPages}
                onClick={() => {
                    pagination.setCurrentPage(pagination.totalPages);
                }}
            >
                <ChevronDoubleRightIcon />
            </button>
            <div className={styles.squareText}>{pagination.totalItems} Rows</div>
        </div>
    );
}
