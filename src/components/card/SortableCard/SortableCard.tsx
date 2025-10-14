'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card as CardType } from '@/types';
import styles from './SortableCard.module.scss';
import { CardComponent } from '../Card';

interface SortableCardProps {
    card: CardType;
    onUpdateCard: (cardId: string, updates: Partial<CardType>) => void;
    onDeleteCard: (cardId: string) => void;
}

export const SortableCard: React.FC<SortableCardProps> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: `card-${props.card.id}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.sortableCard} ${isDragging ? styles.dragging : ''}`}
            {...attributes}
            {...listeners}
        >
            <CardComponent {...props} />
        </div>
    );
};