'use client';

import styles from './ListActionsConfirm.module.scss';
import { MenuView } from '../ListActions';

interface Props {
    type: Extract<MenuView, 'delete-list' | 'delete-cards'>;
    onConfirm: () => void;
}

export const ListActionsConfirm: React.FC<Props> = ({ type, onConfirm }) => (
    <div className={styles.confirmContent}>
        <p className={styles.confirmText}>
            {type === 'delete-list'
                ? "All actions will be removed from the activity feed and you won't be able to re-open the list. There is no undo."
                : 'This will remove all the cards in this list from the board.'}
        </p>
        <button onClick={onConfirm} className={styles.deleteButton}>
            {type === 'delete-list' ? 'Delete list' : 'Delete all cards'}
        </button>
    </div>
);
