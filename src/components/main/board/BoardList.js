import React, {useEffect, useState} from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import {Link} from "react-router-dom";
import {BOARD_URL} from "../../../config/host-config";
import { formatRelativeTime }  from '../../../util/timeFormater'

const BoardList = () => {

    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [curSize, setCurSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [isLastPage, setIsLastPage] = useState(false)
    const now = new Date();

    const getBoardList = async () => {
        try {
            const response = await fetch(`${BOARD_URL}?page=${currentPage}&size=${curSize}`);

            if (!response.ok) {
                throw new Error("Failed to fetch board list");
            }

            const data = await response.json();
            // setBoardList(data.content);
            setCurrentPage(data.number)//  현재 페이지 번호
            setTotalPages(data.totalPages) // 전체 페이지 수
            setIsLastPage(data.last) // 마지막 페이지 여부 (true or false)
            return data;
        } catch (error) {
            console.error("Error fetching board list:", error);
        }
    };

    useEffect(() => {
        const fetchBoardList = async () => {
            const data = await getBoardList();
            setBoardList(data.content);
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
                                <Link to={`/board/${board.id}`} className={styles.itemTitle}>{board.title} ({board.replyCount})</Link>
                                <span className={styles.itemAuthor}>{board.author}</span>
                                <span className={styles.itemDate}>{formatRelativeTime(diffInMs)}</span>
                                <span className={styles.itemViewCount}>{board.viewCount}</span>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.footer}>
                    <div className={styles.btnWrap}>
                        { Array.from(new Array(totalPages)).map((_, index) => (
                            <div>{index+1}</div>
                        )) }
                    </div>
                </div>
            </div>
            <Link to={'write'} className={styles.writeButton}>+</Link>
        </>
    );
};

export default  React.memo(BoardList);