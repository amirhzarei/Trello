"use client";

import { useState, useEffect, useCallback } from "react";
import { Board } from "@/types";
import {
  createList,
  updateListTitle,
  deleteList,
  deleteAllCardsInList,
  reorderLists,
} from "./listActions";
import {
  createCard,
  updateCard,
  deleteCard,
  moveCard,
  reorderCards,
} from "./cardActions";
import { updateBoardTitle } from "./boardActions";

interface UseBoardProps {
  initialBoard: Board;
}

export const useBoard = ({ initialBoard }: UseBoardProps) => {
  const [board, setBoard] = useState<Board>(initialBoard);

  useEffect(() => setBoard(initialBoard), [initialBoard]);

  useEffect(() => {
    if (!board?.id) return;

    try {
      const saved = JSON.parse(localStorage.getItem("trello-boards") || "[]");
      const updatedBoards = Array.isArray(saved)
        ? saved.map((b: Board) => (b.id === board.id ? board : b))
        : [board];
      localStorage.setItem("trello-boards", JSON.stringify(updatedBoards));
    } catch (err) {
      console.error("Error saving board:", err);
    }
  }, [board]);

  const updateBoard = useCallback((updater: (prev: Board) => Board) => {
    setBoard((prev) => {
      const updated = updater(prev);
      return { ...updated, updatedAt: new Date() };
    });
  }, []);

  return {
    board,
    updateBoardTitle: (title: string) => updateBoard(updateBoardTitle(title)),
    createList: (title: string) => updateBoard(createList(title)),
    updateListTitle: (listId: string, title: string) =>
      updateBoard(updateListTitle(listId, title)),
    deleteList: (listId: string) => updateBoard(deleteList(listId)),
    deleteAllCardsInList: (listId: string) =>
      updateBoard(deleteAllCardsInList(listId)),
    reorderLists: (lists: any) => updateBoard(reorderLists(lists)),
    createCard: (listId: any, title: any) =>
      updateBoard(createCard(listId, title)),
    updateCard: (cardId: any, updates: any) =>
      updateBoard(updateCard(cardId, updates)),
    deleteCard: (cardId: any) => updateBoard(deleteCard(cardId)),
    moveCard: (cardId: any, newListId: any, newPos: any) =>
      updateBoard(moveCard(cardId, newListId, newPos)),
    reorderCards: (listId: any, newCards: any) =>
      updateBoard(reorderCards(listId, newCards)),
  };
};
