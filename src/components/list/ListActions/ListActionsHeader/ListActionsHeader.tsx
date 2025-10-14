'use client';

import { ArrowLeft, X } from 'lucide-react';
import { MenuView } from '../ListActions';
import styles from './ListActionsHeader.module.scss';

interface Props {
    currentView: MenuView;
    onBack: () => void;
    onClose: () => void;
}

export const ListActionsHeader: React.FC<Props> = ({
    currentView,
    onBack,
    onClose,
}) => (
    <div className={styles.menuHeader}>
        {currentView === 'main' ? (
            <>
                <span>List Actions</span>
                <button onClick={onClose} className={styles.closeButton}>
                    <X size={16} />
                </button>
            </>
        ) : (
            <>
                <button onClick={onBack} className={styles.backButton}>
                    <ArrowLeft size={16} />
                </button>
                <span>
                    {currentView === 'delete-list' ? 'Delete List' : 'Delete All Cards'}
                </span>
                <div style={{ width: 24 }} />
            </>
        )}
    </div>
);
