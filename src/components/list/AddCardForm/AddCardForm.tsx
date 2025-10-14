'use client';

import { useState, useRef } from 'react';
import styles from './AddCardForm.module.scss';

interface AddCardFormProps {
    listId: string;
    onCreateCard: (listId: string, title: string) => void;
    onCancel: () => void;
}

export const AddCardForm: React.FC<AddCardFormProps> = ({
    listId,
    onCreateCard,
    onCancel,
}) => {
    const [title, setTitle] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleAdd = () => {
        if (title.trim()) {
            onCreateCard(listId, title.trim());
            setTitle('');
            onCancel();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAdd();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    };

    return (
        <div className={styles.addCardForm}>
            <textarea
                ref={textareaRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter a title for this card..."
                className={styles.cardTextarea}
                autoFocus
                rows={3}
            />
            <div className={styles.addCardActions}>
                <button
                    onClick={handleAdd}
                    className={styles.addButton}
                    disabled={!title.trim()}
                >
                    Add card
                </button>
                <button onClick={onCancel} className={styles.cancelButton}>
                    ×
                </button>
            </div>
        </div>
    );
};
