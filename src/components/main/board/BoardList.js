import React, { useEffect, useState } from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import { Link } from 'react-router-dom';
import { BOARD_URL } from "../../../config/host-config";
import { formatRelativeTime } from '../../../util/timeFormater';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

const BoardList = () => {
    const [boardList, setBoardList] = useState([]); // 게시글 리스트
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수
    const [isLastPage, setIsLastPage] = useState(false); // 마지막 페이지 여부
    const now = new Date();

    // 게시글 목록을 가져오는 함수
    const getBoardList = async (page = 0) => {
        try {
            const response = await fetch(`${BOARD_URL}?page=${page}&size=10`);

            if (!response.ok) {
                throw new Error("Failed to fetch board list");
            }

            const data = await response.json();
            setBoardList(data.content); // content 배열만 상태로 저장
            setCurrentPage(data.number); // 현재 페이지 번호
            setTotalPages(data.totalPages); // 전체 페이지 수
            setIsLastPage(data.last); // 마지막 페이지 여부
        } catch (error) {
            console.error("Error fetching board list:", error);
        }
    };

    // 컴포넌트 마운트 시 게시글 목록 불러오기
    useEffect(() => {
        getBoardList();
    }, []);

    // 페이지 변경 핸들러
    const changePage = (page) => {
        if (page >= 0 && page < totalPages) {
            getBoardList(page);
        }
    };

    // 페이지네이션 범위 계산
    const getPageRange = () => {
        const PAGE_GROUP = 5; // 한 번에 보여줄 페이지 수
        let startPage = Math.floor(currentPage / PAGE_GROUP) * PAGE_GROUP;
        let endPage = startPage + PAGE_GROUP;

        // 마지막 페이지를 초과하지 않도록 조정
        if (endPage > totalPages) {
            endPage = totalPages;
        }
        return Array.from({ length: endPage - startPage }, (_, index) => startPage + index);
    };

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
                                <Link to={`/board/${board.id}`} className={styles.itemTitle}>
                                    {board.title} ({board.replyCount})
                                </Link>
                                <span className={styles.itemAuthor}>{board.author}</span>
                                <span className={styles.itemDate}>{formatRelativeTime(diffInMs)}</span>
                                <span className={styles.itemViewCount}>{board.viewCount}</span>
                            </div>
                        );
                    })}
                </div>

                {/* 페이지네이션 */}
                <div className={styles.footer}>
                    <div className={styles.btnWrap}>
                        <div
                            className={styles.pageBtn}
                            onClick={() => changePage(0)}
                            disabled={currentPage === 0}
                        >
                            <MdKeyboardDoubleArrowLeft />

                        </div>
                        <div
                            className={styles.pageBtn}
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            <MdKeyboardArrowLeft />

                        </div>

                        {getPageRange().map((page) => (
                            <div
                                key={page}
                                className={`${styles.pageBtn} ${currentPage === page ? styles.active : ''}`}
                                onClick={() => changePage(page)}
                            >
                                {page + 1}
                            </div>
                        ))}

                        <div
                            className={styles.pageBtn}
                            onClick={() => changePage(currentPage + 1)}
                            disabled={isLastPage}
                        >
                            <MdKeyboardArrowRight />

                        </div>
                        <div
                            className={styles.pageBtn}
                            onClick={() => changePage(totalPages-1)}
                            disabled={isLastPage}
                        >
                            <MdKeyboardDoubleArrowRight />

                        </div>
                    </div>
                </div>
            </div>
            <Link to={'write'} className={styles.writeButton}>+</Link>
        </>
    );
};

export default React.memo(BoardList);