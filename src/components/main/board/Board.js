import React from 'react';
import styles from '../../../styles/board/Board.module.scss';
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";

const Board = () => {
    return (
        <div className={styles.wrap}>
            <BoardHeader/>
            <BoardList/>
        </div>
    );
};

export default Board;