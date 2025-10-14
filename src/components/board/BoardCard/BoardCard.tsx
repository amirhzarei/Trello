'use client';

import { Board } from '@/types';
import styles from './BoardCard.module.scss';

interface BoardCardProps {
    board: Board;
    colors: string[];
    onClick: () => void;
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, colors, onClick }) => (
    <div
        className={styles.boardCard}
        onClick={onClick}
        style={{ backgroundColor: board.color || colors[0] }}
    >
        <h3 className={styles.boardCardTitle}>{board.title}</h3>
        <div className={styles.boardCardMeta}>{board.lists.length} lists</div>
    </div>
);
