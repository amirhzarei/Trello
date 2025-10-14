import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Board, List, Card } from "@/types";

interface BoardState {
  // State
  boards: Board[];
  currentBoardId: string | null;

  // Actions - Boards
  createBoard: (title: string, color?: string) => Board;
  updateBoardTitle: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
  setCurrentBoard: (boardId: string) => void;

  // Actions - Lists
  createList: (boardId: string, title: string) => void;
  updateListTitle: (listId: string, title: string) => void;
  deleteList: (listId: string) => void;
  deleteAllCardsInList: (listId: string) => void;
  reorderLists: (boardId: string, newLists: List[]) => void;

  // Actions - Cards
  createCard: (listId: string, title: string) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  moveCard: (cardId: string, newListId: string, newPosition: number) => void;
  reorderCards: (listId: string, newCards: Card[]) => void;

  // Getters
  getCurrentBoard: () => Board | null;
  getBoardById: (boardId: string) => Board | null;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      // Initial state
      boards: [],
      currentBoardId: null,

      // Board Actions
      createBoard: (title: string, color?: string) => {
        const newBoard: Board = {
          id: Date.now().toString(),
          title: title.trim(),
          color: color || "#0079bf",
          lists: [],
          createdAt: new Date(),
        };

        set((state) => ({
          boards: [...state.boards, newBoard],
          currentBoardId: newBoard.id,
        }));

        return newBoard;
      },

      updateBoardTitle: (boardId: string, title: string) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId ? { ...board, title: title.trim() } : board
          ),
        }));
      },

      deleteBoard: (boardId: string) => {
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== boardId),
          currentBoardId:
            state.currentBoardId === boardId ? null : state.currentBoardId,
        }));
      },

      setCurrentBoard: (boardId: string) => {
        set({ currentBoardId: boardId });
      },

      // List Actions
      createList: (boardId: string, title: string) => {
        const newList: List = {
          id: Date.now().toString(),
          title: title.trim(),
          boardId,
          position: 0,
          cards: [],
          createdAt: new Date(),
        };

        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: [...board.lists, newList].map((list, index) => ({
                    ...list,
                    position: index,
                  })),
                }
              : board
          ),
        }));
      },

      updateListTitle: (listId: string, title: string) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId ? { ...list, title: title.trim() } : list
            ),
          })),
        }));
      },

      deleteList: (listId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.filter((list) => list.id !== listId),
          })),
        }));
      },

      deleteAllCardsInList: (listId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId ? { ...list, cards: [] } : list
            ),
          })),
        }));
      },

      reorderLists: (boardId: string, newLists: List[]) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  lists: newLists.map((list, index) => ({
                    ...list,
                    position: index,
                  })),
                }
              : board
          ),
        }));
      },

      // Card Actions
      createCard: (listId: string, title: string) => {
        const newCard: Card = {
          id: Date.now().toString(),
          title: title.trim(),
          listId,
          position: 0,
          createdAt: new Date(),
        };

        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) =>
              list.id === listId
                ? {
                    ...list,
                    cards: [...list.cards, newCard].map((card, index) => ({
                      ...card,
                      position: index,
                    })),
                  }
                : list
            ),
          })),
        }));
      },

      updateCard: (cardId: string, updates: Partial<Card>) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => ({
              ...list,
              cards: list.cards.map((card) =>
                card.id === cardId ? { ...card, ...updates } : card
              ),
            })),
          })),
        }));
      },

      deleteCard: (cardId: string) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => ({
              ...list,
              cards: list.cards.filter((card) => card.id !== cardId),
            })),
          })),
        }));
      },

      moveCard: (cardId: string, newListId: string, newPosition: number) => {
        set((state) => {
          let cardToMove: Card | undefined;
          let sourceListId: string | undefined;

          // Find card and source list
          const boards = state.boards.map((board) => {
            const updatedLists = board.lists.map((list) => {
              const cardIndex = list.cards.findIndex(
                (card) => card.id === cardId
              );
              if (cardIndex !== -1) {
                cardToMove = list.cards[cardIndex];
                sourceListId = list.id;
                // Remove from source list
                return {
                  ...list,
                  cards: list.cards.filter((card) => card.id !== cardId),
                };
              }
              return list;
            });

            return { ...board, lists: updatedLists };
          });

          if (!cardToMove || !sourceListId) return { boards };

          // Update card with new listId
          const updatedCard: Card = {
            ...cardToMove,
            listId: newListId,
          };

          // Add to target list
          const finalBoards = boards.map((board) => ({
            ...board,
            lists: board.lists.map((list) => {
              if (list.id === newListId) {
                const newCards = [...list.cards];
                newCards.splice(newPosition, 0, updatedCard);
                return {
                  ...list,
                  cards: newCards.map((card, index) => ({
                    ...card,
                    position: index,
                  })),
                };
              }
              return list;
            }),
          }));

          return { boards: finalBoards };
        });
      },

      reorderCards: (listId: string, newCards: Card[]) => {
        set((state) => ({
          boards: state.boards.map((board) => ({
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
          })),
        }));
      },

      // Getters
      getCurrentBoard: () => {
        const state = get();
        return (
          state.boards.find((board) => board.id === state.currentBoardId) ||
          null
        );
      },

      getBoardById: (boardId: string) => {
        const state = get();
        return state.boards.find((board) => board.id === boardId) || null;
      },
    }),
    {
      name: "trello-boards-storage", // localStorage key
    }
  )
);
