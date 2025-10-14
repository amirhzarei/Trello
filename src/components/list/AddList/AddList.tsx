'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './AddList.module.scss';

interface AddListProps {
    onCreateList: (title: string) => void;
}

export const AddList: React.FC<AddListProps> = ({ onCreateList }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsAdding(false);
                setTitle('');
            }
        };

        if (isAdding) {
            setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isAdding]);

    const handleSubmit = () => {
        if (title.trim()) {
            onCreateList(title.trim());
            setTitle('');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleCancel = () => {
        setTitle('');
        setIsAdding(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div className={styles.addList}>
            {isAdding ? (
                <div ref={formRef} className={styles.addListForm}>
                    <input
                        ref={inputRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter list title..."
                        className={styles.listInput}
                        autoFocus
                    />
                    <div className={styles.addListActions}>
                        <button
                            onClick={handleSubmit}
                            className={styles.addButton}
                            disabled={!title.trim()}
                        >
                            Add list
                        </button>
                        <button
                            onClick={handleCancel}
                            className={styles.cancelButton}
                        >
                            ×
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className={styles.addListButton}
                >
                    + Add another list
                </button>
            )}
        </div>
    );
};