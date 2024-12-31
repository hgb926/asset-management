import React, { useEffect, useState } from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BOARD_URL } from "../../../config/host-config";
import { formatRelativeTime } from '../../../util/timeFormater';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";

const BoardList = () => {
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const now = new Date();

    const location = useLocation();
    const navigate = useNavigate();

    // 현재 URL에서 페이지 번호 추출
    const getPageFromQuery = () => {
        const queryParams = new URLSearchParams(location.search);
        return parseInt(queryParams.get('page')) || 0;
    };

    // 게시글 목록을 가져오는 함수
    const getBoardList = async (page = 0) => {
        try {
            const response = await fetch(`${BOARD_URL}?page=${page}&size=10`);

            if (!response.ok) {
                throw new Error("Failed to fetch board list");
            }

            const data = await response.json();
            setBoardList(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);
            setIsLastPage(data.last);
        } catch (error) {
            console.error("Error fetching board list:", error);
        }
    };

    // URL의 페이지 번호를 기준으로 데이터 불러오기
    useEffect(() => {
        const page = getPageFromQuery();
        getBoardList(page);
    }, [location.search]);

    // 페이지 변경 핸들러 (URL 업데이트)
    const changePage = (page) => {
        if (page >= 0 && page < totalPages) {
            navigate(`?page=${page}`);
        }
    };

    // 페이지네이션 범위 계산
    const getPageRange = () => {
        const PAGE_GROUP = 5;
        let startPage = Math.floor(currentPage / PAGE_GROUP) * PAGE_GROUP;
        let endPage = startPage + PAGE_GROUP;

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
                            onClick={() => changePage(totalPages - 1)}
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