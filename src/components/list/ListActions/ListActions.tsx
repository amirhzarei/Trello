'use client';

import { useState, useRef, useEffect } from 'react';
import { List as ListType } from '@/types';
import styles from './ListActions.module.scss';
import { ListActionsHeader } from './ListActionsHeader/ListActionsHeader';
import { ListActionsMain } from './ListActionsMain/ListActionsMain';
import { ListActionsConfirm } from './ListActionsConfirm/ListActionsConfirm';

interface ListActionsProps {
    list: ListType;
    onClose: () => void;
    onDeleteList: (listId: string) => void;
    onDeleteAllCards: (listId: string) => void;
    position: { top: number; left: number };
}

export type MenuView = 'main' | 'delete-list' | 'delete-cards';

export const ListActions: React.FC<ListActionsProps> = ({
    list,
    onClose,
    onDeleteList,
    onDeleteAllCards,
    position,
}) => {
    const [currentView, setCurrentView] = useState<MenuView>('main');
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleDeleteList = () => {
        onDeleteList(list.id);
        onClose();
    };

    const handleDeleteAllCards = () => {
        onDeleteAllCards(list.id);
        onClose();
    };

    return (
        <div
            ref={menuRef}
            className={styles.actionsMenu}
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
            }}
        >
            <ListActionsHeader
                currentView={currentView}
                onBack={() => setCurrentView('main')}
                onClose={onClose}
            />

            {currentView === 'main' ? (
                <ListActionsMain onSelect={setCurrentView} />
            ) : (
                <ListActionsConfirm
                    type={currentView}
                    onConfirm={
                        currentView === 'delete-list'
                            ? handleDeleteList
                            : handleDeleteAllCards
                    }
                />
            )}
        </div>
    );
};
