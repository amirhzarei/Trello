'use client';

import { useState } from 'react';
import { Card as CardType } from '@/types';
import styles from './Card.module.scss';
import { CardModal } from './CardModal/CardModal';
import { CardContent } from './CardContent/CardContent';

interface CardProps {
    card: CardType;
    onUpdateCard: (cardId: string, updates: Partial<CardType>) => void;
    onDeleteCard: (cardId: string) => void;
}

export const CardComponent: React.FC<CardProps> = ({ card, onUpdateCard, onDeleteCard }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className={styles.card} onClick={() => setShowModal(true)}>
                <CardContent card={card} onUpdateCard={onUpdateCard} />
            </div>

            {showModal && (
                <CardModal
                    card={card}
                    onClose={() => setShowModal(false)}
                    onUpdateCard={onUpdateCard}
                    onDeleteCard={onDeleteCard}
                />
            )}
        </>
    );
};
