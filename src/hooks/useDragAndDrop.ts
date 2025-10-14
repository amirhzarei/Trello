"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { List, Card } from "@/types";

interface UseDragAndDropProps {
  lists: List[];
  onListReorder: (lists: List[]) => void;
  onCardMove: (cardId: string, newListId: string, newPosition: number) => void;
  onCardReorder: (listId: string, cards: Card[]) => void;
}

export const useDragAndDrop = ({
  lists,
  onListReorder,
  onCardMove,
  onCardReorder,
}: UseDragAndDropProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId.startsWith("list-")) {
      const oldIndex = lists.findIndex(
        (list) => `list-${list.id}` === activeId
      );
      const newIndex = lists.findIndex((list) => `list-${list.id}` === overId);

      if (oldIndex !== newIndex && newIndex !== -1) {
        const newLists = arrayMove(lists, oldIndex, newIndex);
        onListReorder(newLists);
      }
      return;
    }

    const activeCardId = activeId.replace("card-", "");
    const overIdStr = over.id as string;

    // If dropped on a list
    if (overIdStr.startsWith("list-")) {
      const targetListId = overIdStr.replace("list-", "");
      const targetList = lists.find((list) => list.id === targetListId);

      if (targetList) {
        onCardMove(activeCardId, targetListId, targetList.cards.length);
      }
      return;
    }

    // If dropped on a card
    if (overIdStr.startsWith("card-")) {
      const targetCardId = overIdStr.replace("card-", "");
      const sourceList = lists.find((list) =>
        list.cards.some((card) => card.id === activeCardId)
      );
      const targetList = lists.find((list) =>
        list.cards.some((card) => card.id === targetCardId)
      );

      if (!sourceList || !targetList) return;

      // Moving within same list
      if (sourceList.id === targetList.id) {
        const oldIndex = sourceList.cards.findIndex(
          (card) => card.id === activeCardId
        );
        const newIndex = sourceList.cards.findIndex(
          (card) => card.id === targetCardId
        );

        if (oldIndex !== newIndex && newIndex !== -1) {
          const newCards = arrayMove(sourceList.cards, oldIndex, newIndex);
          onCardReorder(sourceList.id, newCards);
        }
      } else {
        // Moving to different list
        const targetIndex = targetList.cards.findIndex(
          (card) => card.id === targetCardId
        );
        onCardMove(activeCardId, targetList.id, targetIndex);
      }
    }
  };

  return {
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
};
