'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './CardModalHeader.module.scss';

interface CardModalHeaderProps {
    title: string;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    onChange: (val: string) => void;
    onSubmit: () => void;
    onClose: () => void;
}

export const CardModalHeader: React.FC<CardModalHeaderProps> = ({
    title,
    isEditing,
    setIsEditing,
    onChange,
    onSubmit,
    onClose
}) => {
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.modalHeader}>
            {isEditing ? (
                <textarea
                    ref={inputRef}
                    value={title}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={onSubmit}
                    className={styles.titleInput}
                    rows={2}
                />
            ) : (
                <h2 className={styles.title} onClick={() => setIsEditing(true)}>
                    {title}
                </h2>
            )}
            <button onClick={onClose} className={styles.closeButton}>
                <X size={20} />
            </button>
        </div>
    );
};
