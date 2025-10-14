'use client';

import { Trash2 } from 'lucide-react';
import styles from './CardActions.module.scss';

interface CardActionsProps {
    onDelete: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({ onDelete }) => {
    return (
        <div className={styles.section}>
            <div className={styles.sectionHeader}>
                <h3>Actions</h3>
            </div>
            <button onClick={onDelete} className={styles.deleteCardButton}>
                <Trash2 size={16} /> Delete Card
            </button>
        </div>
    );
};
