'use client';

import { useState } from 'react';
import { Card as CardType } from '@/types';
import styles from './CardModal.module.scss';
import { CardModalHeader } from './CardModalHeader/CardModalHeader';
import { CardDescription } from './CardDescription/CardDescription';
import { CardActions } from './CardActions/CardActions';

interface CardModalProps {
    card: CardType;
    onClose: () => void;
    onUpdateCard: (cardId: string, updates: Partial<CardType>) => void;
    onDeleteCard: (cardId: string) => void;
}

export const CardModal: React.FC<CardModalProps> = ({ card, onClose, onUpdateCard, onDeleteCard }) => {
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description || '');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const handleTitleSubmit = () => {
        if (title.trim() && title !== card.title) onUpdateCard(card.id, { title: title.trim() });
        setIsEditingTitle(false);
    };

    const handleDescriptionSubmit = () => {
        onUpdateCard(card.id, { description: description.trim() || undefined });
        setIsEditingDescription(false);
    };

    const handleDeleteCard = () => {
        onDeleteCard(card.id);
        onClose();
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <CardModalHeader
                    title={title}
                    isEditing={isEditingTitle}
                    setIsEditing={setIsEditingTitle}
                    onChange={setTitle}
                    onSubmit={handleTitleSubmit}
                    onClose={onClose}
                />

                <div className={styles.modalContent}>
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}><h3>Description</h3></div>
                        <CardDescription
                            description={description}
                            isEditing={isEditingDescription}
                            setIsEditing={setIsEditingDescription}
                            onChange={setDescription}
                            onSubmit={handleDescriptionSubmit}
                        />
                    </div>

                    <CardActions onDelete={handleDeleteCard} />
                </div>
            </div>
        </div>
    );
};
