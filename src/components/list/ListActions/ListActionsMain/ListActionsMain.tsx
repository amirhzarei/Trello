'use client';

import { Trash2 } from 'lucide-react';
import { MenuView } from '../ListActions';
import styles from './ListActionsMain.module.scss';

interface Props {
    onSelect: (view: MenuView) => void;
}

export const ListActionsMain: React.FC<Props> = ({ onSelect }) => (
    <div className={styles.menuItems}>
        <button
            onClick={() => onSelect('delete-cards')}
            className={styles.menuItem}
        >
            <Trash2 size={16} />
            Delete All Cards
        </button>
        <button
            onClick={() => onSelect('delete-list')}
            className={styles.menuItem}
        >
            <Trash2 size={16} />
            Delete List
        </button>
    </div>
);
