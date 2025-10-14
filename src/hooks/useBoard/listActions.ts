import { Board, List } from "@/types";

export const createList =
  (title: string) =>
  (board: Board): Board => ({
    ...board,
    lists: [
      ...board.lists,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        boardId: board.id,
        position: board.lists.length,
        cards: [],
        createdAt: new Date(),
      },
    ],
  });

export const updateListTitle =
  (listId: string, title: string) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId ? { ...list, title: title.trim() } : list
    ),
  });

export const deleteList =
  (listId: string) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.filter((list) => list.id !== listId),
  });

export const deleteAllCardsInList =
  (listId: string) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId ? { ...list, cards: [] } : list
    ),
  });

export const reorderLists =
  (newLists: List[]) =>
  (board: Board): Board => ({
    ...board,
    lists: newLists.map((list, index) => ({ ...list, position: index })),
  });
