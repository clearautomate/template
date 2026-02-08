'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import styles from './rating.module.css';

export default function Rating({ maxRating = 5 }: { maxRating?: number }) {
    const [rating, setRating] = useState(0);

    return (
        <div className={styles.wrapper}>
            {[...Array(maxRating)].map((_, index) => {
                const filled = index < rating;
                return (
                    <button
                        key={index}
                        className={styles.star}
                        onClick={() => setRating(index + 1)}
                    >
                        {filled ? <StarIconSolid className={styles.solidStar} /> : <StarIcon />}
                    </button>
                );
            })}
        </div>
    );
}
