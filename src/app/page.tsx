'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBoardStore } from '@/stores/boardStore';
import { Header } from '@/components/layout/Header/Header';
import styles from './page.module.scss';
import { CreateBoardCard } from '@/components/board/CreateBoardCard/CreateBoardCard';
import { BoardCard } from '@/components/board/BoardCard/BoardCard';

const BOARD_COLORS = [
  '#0079bf',
  '#d29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
];

export default function HomePage() {
  const router = useRouter();
  const { boards, createBoard, setCurrentBoard } = useBoardStore();
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className={styles.home}>
      <Header />

      <div className={styles.homeContent}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>My Boards</h1>
        </div>

        <div className={styles.boardsGrid}>
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
              colors={BOARD_COLORS}
              onClick={() => {
                setCurrentBoard(board.id);
                router.push(`/board/${board.id}`);
              }}
            />
          ))}

          {isCreating ? (
            <CreateBoardCard
              colors={BOARD_COLORS}
              onCreate={(title, color) => {
                const newBoard = createBoard(title, color);
                setCurrentBoard(newBoard.id);
                router.push(`/board/${newBoard.id}`);
                setIsCreating(false);
              }}
              onCancel={() => setIsCreating(false)}
            />
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className={styles.createBoardButton}
            >
              Create new board...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
