'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Board } from '@/types';
import { ArrowLeft } from 'lucide-react';
import styles from './HeaderContent.module.scss';

interface HeaderContentProps {
    board?: Board;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ board }) => {
    const pathname = usePathname();
    const router = useRouter();

    const isBoardPage = pathname.startsWith('/board/');
    const isHomePage = pathname === '/';

    if (isHomePage) {
        return (
            <div className={styles.homeHeader}>
                <h1 className={styles.title}>Kanban</h1>
            </div>
        );
    }

    return (
        <div className={styles.defaultHeader}>
            <button
                onClick={() => router.push('/')}
                className={styles.backButton}
            >
                <ArrowLeft size={20} />
                <p className={styles.backText}>Boards</p>
            </button>
        </div>
    );
};
