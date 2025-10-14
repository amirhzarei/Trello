'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBoardStore } from '@/stores/boardStore';
import { Header } from '@/components/layout/Header/Header';
import { BoardComponent } from '@/components/board/Board';

export default function BoardPage() {
    const params = useParams();
    const router = useRouter();
    const boardId = params.id as string;

    const { getBoardById, setCurrentBoard } = useBoardStore();
    const board = getBoardById(boardId);

    useEffect(() => {
        if (boardId) {
            setCurrentBoard(boardId);
        }
    }, [boardId, setCurrentBoard]);

    useEffect(() => {
        if (!board && boardId) {
            console.log('Board not found, redirecting to home...');
            router.push('/');
        }
    }, [board, boardId, router]);

    if (!board) {
        return (
            <div style={{
                background: '#0079bf',
                minHeight: '100vh',
                color: 'white'
            }}>
                <Header />
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'calc(100vh - 60px)',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <h2 style={{ margin: 0 }}>Loading board...</h2>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: board.color || '#0079bf',
            minHeight: '100vh',
            backgroundImage: board.color ? 'none' : 'linear-gradient(135deg, #0079bf 0%, #026aa7 100%)'
        }}>
            <Header board={board} />
            <BoardComponent board={board} />
        </div>
    );
}