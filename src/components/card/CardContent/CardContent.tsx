'use client';

import { useState } from 'react';
import { Card as CardType } from '@/types';
import styles from './CardContent.module.scss';

interface CardContentProps {
    card: CardType;
    onUpdateCard: (cardId: string, updates: Partial<CardType>) => void;
}

export const CardContent: React.FC<CardContentProps> = ({ card, onUpdateCard }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(card.title);

    const handleSubmit = () => {
        if (title.trim() && title !== card.title) {
            onUpdateCard(card.id, { title: title.trim() });
        } else {
            setTitle(card.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        } else if (e.key === 'Escape') {
            setTitle(card.title);
            setIsEditing(false);
        }
    };

    const handleBlur = () => handleSubmit();

    if (isEditing) {
        return (
            <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={styles.cardInput}
                autoFocus
                rows={3}
            />
        );
    }

    return (
        <div className={styles.cardContent} onDoubleClick={() => setIsEditing(true)}>
            {card.title}
            {card.description && <div className={styles.descriptionIndicator}>📝</div>}
        </div>
    );
};
