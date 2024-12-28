import React from 'react';
import styles from '../../../styles/board/Board.module.scss';
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";
import WriteForm from "./WriteForm";
import BoardDetail from "./BoardDetail";
import { Routes, Route } from 'react-router-dom';

const Board = () => {
    return (
        <div className={styles.wrap}>
            <Routes>
                <Route index element={
                    <>
                        <BoardHeader />
                        <BoardList />
                    </>
                } />
                <Route path="write" element={<WriteForm />} />
                <Route path=":id" element={<BoardDetail />} />
            </Routes>
        </div>
    );
};

export default Board;