'use client';

import styles from './BoardHeader.module.scss';

interface BoardHeaderProps {
    title: string;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    onChangeTitle: (val: string) => void;
    onSubmit: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({
    title,
    isEditing,
    setIsEditing,
    onChangeTitle,
    onSubmit,
    onKeyDown
}) => (
    <div className={styles.boardHeader}>
        {isEditing ? (
            <input
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
                onBlur={onSubmit}
                onKeyDown={onKeyDown}
                autoFocus
                className={styles.boardTitleInput}
            />
        ) : (
            <h1 className={styles.boardTitle} onClick={() => setIsEditing(true)}>
                {title}
            </h1>
        )}
    </div>
);
