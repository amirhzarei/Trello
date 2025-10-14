export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  createdAt: Date;
}

export interface List {
  id: string;
  title: string;
  boardId: string;
  position: number;
  cards: Card[];
  createdAt: Date;
}

export interface Board {
  id: string;
  title: string;
  lists: List[];
  createdAt: Date;
  color?: string;
}

export interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
}

export type ModalType = "card-details" | "delete-list" | "delete-cards" | null;
