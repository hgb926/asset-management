import React from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import { Link } from 'react-router-dom';
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight
} from "react-icons/md";
import { formatRelativeTime } from '../../../util/timeFormater';

const BoardList = ({ boardList, currentPage, totalPages, isLastPage, changePage }) => {
    const now = new Date();

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
                        <div onClick={() => changePage(0)} disabled={currentPage === 0}>
                            <MdKeyboardDoubleArrowLeft />
                        </div>
                        <div onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
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

                        <div onClick={() => changePage(currentPage + 1)} disabled={isLastPage}>
                            <MdKeyboardArrowRight />
                        </div>
                        <div onClick={() => changePage(totalPages - 1)} disabled={isLastPage}>
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