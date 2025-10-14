'use client';

import { Board } from '@/types';
import { darkenColor } from '@/utils/color';
import styles from './Header.module.scss';
import { HeaderContent } from './HeaderContent/HeaderContent';

interface HeaderProps {
    board?: Board;
}

export const Header: React.FC<HeaderProps> = ({ board }) => {
    const headerColor = board?.color ? darkenColor(board.color, 20) : '#0079bf';

    return (
        <header
            className={styles.header}
            style={{ backgroundColor: headerColor }}
        >
            <div className={styles.headerContent}>
                <HeaderContent board={board} />
            </div>
        </header>
    );
};
