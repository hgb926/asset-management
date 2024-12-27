import React, {useEffect, useState} from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import {Link} from "react-router-dom";
import {BOARD_URL} from "../../../config/host-config";
import {FaRegCommentDots} from "react-icons/fa";
import { formatRelativeTime }  from '../../../util/timeFormater'

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);
    const now = new Date();

    const getBoardList = async () => {
        try {
            const response = await fetch(BOARD_URL);

            if (!response.ok) {
                throw new Error("Failed to fetch board list");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching board list:", error);
        }
    };

    useEffect(() => {
        const fetchBoardList = async () => {
            const data = await getBoardList();
            setBoardList(data);
        };

        fetchBoardList();
    }, []);



    return (
        <>
            <div className={styles.boardWrap}>

                <div className={styles.boardList}>
                    <div className={styles.header}>
                        <span>번호</span>
                        <span>제목</span>
                        <span>작성자</span>
                        <span>작성일</span>
                        <span>조회수</span>
                    </div>
                    {boardList.map((board) => {
                        const diffInMs = now - new Date(board.createdAt);
                        return (
                            <div key={board.id} className={styles.boardItem}>
                                <span className={styles.itemId}>{board.id}</span>
                                {/*<span className={styles.itemTitle}>{board.title} <FaRegCommentDots />{board.replyCount}</span>*/}
                                <span className={styles.itemTitle}>{board.title} ({board.replyCount})</span>
                                <span className={styles.itemAuthor}>{board.author}</span>
                                <span className={styles.itemDate}>{formatRelativeTime(diffInMs)}</span>
                                <span className={styles.itemViewCount}>{board.viewCount}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.footer}>
                    <div className={styles.btnWrap}>
                        <button className={styles.pageBtn}>1</button>
                        <button className={styles.pageBtn}>2</button>
                        <button className={styles.pageBtn}>3</button>
                    </div>
                </div>
            </div>
            <Link to={'write'} className={styles.writeButton}>+</Link>
        </>
    );
};

export default  React.memo(BoardList);