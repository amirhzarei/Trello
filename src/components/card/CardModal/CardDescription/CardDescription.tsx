'use client';

import { useEffect, useRef } from 'react';
import styles from './CardDescription.module.scss';

interface CardDescriptionProps {
    description: string;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    onChange: (val: string) => void;
    onSubmit: () => void;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
    description,
    isEditing,
    setIsEditing,
    onChange,
    onSubmit
}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <div className={styles.descriptionEditor}>
                <textarea
                    ref={inputRef}
                    value={description}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={onSubmit}
                    className={styles.descriptionInput}
                    rows={4}
                />
                <div className={styles.descriptionActions}>
                    <button onClick={onSubmit} className={styles.saveButton}>Save</button>
                    <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.descriptionDisplay} onClick={() => setIsEditing(true)}>
            {description || <p className={styles.placeholder}>Add a more detailed description...</p>}
        </div>
    );
};
