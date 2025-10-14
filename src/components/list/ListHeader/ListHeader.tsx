'use client';

import { useState, useRef, useEffect } from 'react';
import { List as ListType } from '@/types';
import { MoreHorizontal } from 'lucide-react';
import styles from './ListHeader.module.scss';

interface ListHeaderProps {
    list: ListType;
    onUpdateTitle: (listId: string, title: string) => void;
    onShowActions: () => void;
    menuButtonRef: React.RefObject<HTMLButtonElement>;
}

export const ListHeader: React.FC<ListHeaderProps> = ({
    list,
    onUpdateTitle,
    onShowActions,
    menuButtonRef,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(list.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSubmit = () => {
        if (title.trim() && title !== list.title) {
            onUpdateTitle(list.id, title.trim());
        } else {
            setTitle(list.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        } else if (e.key === 'Escape') {
            setTitle(list.title);
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleSubmit();
    };

    return (
        <div className={styles.header}>
            {isEditing ? (
                <input
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    className={styles.titleInput}
                    autoFocus
                />
            ) : (
                <>
                    <h3
                        className={styles.title}
                        onClick={() => setIsEditing(true)}
                    >
                        {list.title}
                    </h3>
                    <button
                        ref={menuButtonRef}
                        onClick={onShowActions}
                        className={styles.menuButton}
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </>
            )}
        </div>
    );
};