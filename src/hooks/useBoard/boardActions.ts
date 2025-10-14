import { Board } from "@/types";

export const updateBoardTitle =
  (title: string) =>
  (board: Board): Board => ({
    ...board,
    title: title.trim(),
  });
