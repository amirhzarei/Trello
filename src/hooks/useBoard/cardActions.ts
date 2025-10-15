import { Board, Card } from "@/types";

export const createCard =
  (listId: string, title: string) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: [
              ...list.cards,
              {
                id: crypto.randomUUID(),
                title: title.trim(),
                listId,
                position: list.cards.length,
                createdAt: new Date(),
              },
            ],
          }
        : list
    ),
  });

export const updateCard =
  (cardId: string, updates: Partial<Card>) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      ),
    })),
  });

export const deleteCard =
  (cardId: string) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) => ({
      ...list,
      cards: list.cards.filter((card) => card.id !== cardId),
    })),
  });

export const moveCard =
  (cardId: string, newListId: string, newPosition: number) =>
  (board: Board): Board => {
    let cardToMove: Card | undefined;

    const listsWithoutCard = board.lists.map((list) => {
      const card = list.cards.find((c) => c.id === cardId);
      if (card) {
        cardToMove = card;
        return { ...list, cards: list.cards.filter((c) => c.id !== cardId) };
      }
      return list;
    });

    if (!cardToMove) return board;

    const updatedCard = { ...cardToMove, listId: newListId };

    const updatedLists = listsWithoutCard.map((list) => {
      if (list.id === newListId) {
        const newCards = [...list.cards];
        newCards.splice(newPosition, 0, updatedCard);
        return {
          ...list,
          cards: newCards.map((card, i) => ({ ...card, position: i })),
        };
      }
      return list;
    });

    return { ...board, lists: updatedLists };
  };

export const reorderCards =
  (listId: string, newCards: Card[]) =>
  (board: Board): Board => ({
    ...board,
    lists: board.lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: newCards.map((card, index) => ({
              ...card,
              position: index,
            })),
          }
        : list
    ),
  });
