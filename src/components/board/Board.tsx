'use client';

import { useState } from 'react';
import { Board as BoardType } from '@/types';
import { useBoardStore } from '@/stores/boardStore';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import styles from './Board.module.scss';
import { BoardHeader } from './BoardHeader/BoardHeader';
import { SortableList } from '../list/SortableList/SortableList';
import { AddList } from '../list/AddList/AddList';

interface BoardProps {
    board: BoardType;
}

export const BoardComponent: React.FC<BoardProps> = ({ board }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [boardTitle, setBoardTitle] = useState(board.title);

    const {
        updateBoardTitle,
        createList,
        updateListTitle,
        deleteList,
        deleteAllCardsInList,
        createCard,
        updateCard,
        deleteCard,
        moveCard,
        reorderLists,
        reorderCards,
    } = useBoardStore();

    const { activeId, sensors, handleDragStart, handleDragEnd } = useDragAndDrop({
        lists: board.lists,
        onListReorder: (newLists) => reorderLists(board.id, newLists),
        onCardMove: moveCard,
        onCardReorder: reorderCards,
    });

    const handleTitleSubmit = () => {
        if (boardTitle.trim() && boardTitle !== board.title) {
            updateBoardTitle(board.id, boardTitle.trim());
        } else {
            setBoardTitle(board.title);
        }
        setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleTitleSubmit();
        else if (e.key === 'Escape') {
            setBoardTitle(board.title);
            setIsEditingTitle(false);
        }
    };

    return (
        <div className={styles.boardContent}>
            <BoardHeader
                title={boardTitle}
                isEditing={isEditingTitle}
                setIsEditing={setIsEditingTitle}
                onChangeTitle={setBoardTitle}
                onSubmit={handleTitleSubmit}
                onKeyDown={handleTitleKeyDown}
            />

            <div className={styles.listsContainer}>
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                    <SortableContext items={board.lists.map(list => `list-${list.id}`)} strategy={horizontalListSortingStrategy}>
                        <div className={styles.lists}>
                            {board.lists.map(list => (
                                <SortableList
                                    key={list.id}
                                    list={list}
                                    onUpdateTitle={updateListTitle}
                                    onDeleteList={deleteList}
                                    onDeleteAllCards={deleteAllCardsInList}
                                    onCreateCard={createCard}
                                    onUpdateCard={updateCard}
                                    onDeleteCard={deleteCard}
                                />
                            ))}
                            <AddList onCreateList={title => createList(board.id, title)} />
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
};
