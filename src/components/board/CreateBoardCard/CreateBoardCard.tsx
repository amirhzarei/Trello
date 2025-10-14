'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CreateBoardCard.module.scss';

interface CreateBoardCardProps {
    colors: string[];
    onCreate: (title: string, color: string) => void;
    onCancel: () => void;
}

export const CreateBoardCard: React.FC<CreateBoardCardProps> = ({ colors, onCreate, onCancel }) => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState(colors[0]);
    const formRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (title.trim()) onCreate(title.trim(), color);
        } else if (e.key === 'Escape') {
            onCancel();
            setTitle('');
            setColor(colors[0]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                onCancel();
                setTitle('');
                setColor(colors[0]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onCancel, colors]);

    return (
        <div ref={formRef} className={styles.createBoardCard}>
            <div className={styles.createBoardForm}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add board title"
                    className={styles.boardInput}
                    autoFocus
                />
                <div className={styles.colorPickerSection}>
                    <div className={styles.colorGrid}>
                        {colors.map((c) => (
                            <button
                                key={c}
                                className={`${styles.colorOption} ${color === c ? styles.selected : ''}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.createBoardActions}>
                    <button
                        onClick={() => title.trim() && onCreate(title.trim(), color)}
                        className={styles.createButton}
                        disabled={!title.trim()}
                    >
                        Create Board
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton} type="button">
                        ×
                    </button>
                </div>
            </div>
        </div>
    );
};
