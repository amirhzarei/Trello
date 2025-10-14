'use client';

import { useState, useRef } from 'react';
import { List as ListType, Card } from '@/types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './List.module.scss';
import { ListHeader } from './ListHeader/ListHeader';
import { SortableCard } from '../card/SortableCard/SortableCard';
import { ListActions } from './ListActions/ListActions';
import { AddCardForm } from './AddCardForm/AddCardForm';

interface ListProps {
    list: ListType;
    onUpdateTitle: (listId: string, title: string) => void;
    onDeleteList: (listId: string) => void;
    onDeleteAllCards: (listId: string) => void;
    onCreateCard: (listId: string, title: string) => void;
    onUpdateCard: (cardId: string, updates: Partial<Card>) => void;
    onDeleteCard: (cardId: string) => void;
}

export const ListComponent: React.FC<ListProps> = ({
    list,
    onUpdateTitle,
    onDeleteList,
    onDeleteAllCards,
    onCreateCard,
    onUpdateCard,
    onDeleteCard,
}) => {
    const [isAddingCard, setIsAddingCard] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    const handleShowActions = () => {
        if (menuButtonRef.current) {
            const rect = menuButtonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
            setShowActions(true);
        }
    };

    return (
        <div className={styles.list}>
            <ListHeader
                list={list}
                onUpdateTitle={onUpdateTitle}
                onShowActions={handleShowActions}
                menuButtonRef={menuButtonRef as any}
            />

            <div className={styles.cards}>
                <SortableContext
                    items={list.cards.map(card => `card-${card.id}`)}
                    strategy={verticalListSortingStrategy}
                >
                    {list.cards.map((card) => (
                        <SortableCard
                            key={card.id}
                            card={card}
                            onUpdateCard={onUpdateCard}
                            onDeleteCard={onDeleteCard}
                        />
                    ))}
                </SortableContext>
            </div>

            {isAddingCard ? (
                <AddCardForm
                    listId={list.id}
                    onCreateCard={onCreateCard}
                    onCancel={() => setIsAddingCard(false)}
                />
            ) : (
                <button
                    onClick={() => setIsAddingCard(true)}
                    className={styles.addCardButton}
                >
                    + Add another card
                </button>
            )}

            {showActions && (
                <ListActions
                    list={list}
                    onClose={() => setShowActions(false)}
                    onDeleteList={onDeleteList}
                    onDeleteAllCards={onDeleteAllCards}
                    position={menuPosition}
                />
            )}
        </div>
    );
};