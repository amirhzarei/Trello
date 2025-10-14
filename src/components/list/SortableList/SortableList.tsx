'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { List as ListType, Card } from '@/types';
import styles from './SortableList.module.scss';
import { ListComponent } from '../List';

interface SortableListProps {
    list: ListType;
    onUpdateTitle: (listId: string, title: string) => void;
    onDeleteList: (listId: string) => void;
    onDeleteAllCards: (listId: string) => void;
    onCreateCard: (listId: string, title: string) => void;
    onUpdateCard: (cardId: string, updates: Partial<Card>) => void;
    onDeleteCard: (cardId: string) => void;
}

export const SortableList: React.FC<SortableListProps> = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: `list-${props.list.id}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.sortableList} ${isDragging ? styles.dragging : ''}`}
            {...attributes}
            {...listeners}
        >
            <ListComponent {...props} />
        </div>
    );
};