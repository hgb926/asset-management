import React, { useState, useEffect } from 'react';
import styles from '../../../styles/board/BoardDetail.module.scss';
import { useParams } from 'react-router-dom';
import { BOARD_URL } from '../../../config/host-config';
import { formatRelativeTime } from "../../../util/timeFormater";

const BoardDetail = () => {
    const [boardData, setBoardData] = useState({ replies: [] }); // 초기값 설정
    const params = useParams();
    const boardId = params.id;
    const now = new Date();

    const getBoardDetail = async () => {
        try {
            const response = await fetch(`${BOARD_URL}/${boardId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch board detail');
            }

            const data = await response.json();
            setBoardData(data);
        } catch (error) {
            console.error('Error fetching board detail:', error);
        }
    };

    useEffect(() => {
        getBoardDetail();
    }, [boardId]);

    return (
        <div className={styles.detailWrap}>
            {/* 게시글 정보 */}
            <div className={styles.header}>
                <h1 className={styles.title}>{boardData.title || '제목 없음'}</h1>
                <div className={styles.info}>
                    <span>작성자: {boardData.author || '알 수 없음'}</span>
                    <span>{formatRelativeTime( now - new Date(boardData.createdAt)) || '알 수 없음'}</span>
                    <span>조회수: {boardData.viewCount || 0}</span>
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className={styles.contentWrap}>
                <p className={styles.content}>{boardData.content}</p>
            </div>

            {/* 댓글 섹션 */}
            <div className={styles.replySection}>
                <h2>댓글 ({boardData.replyCount || 0})</h2>
                <div className={styles.replyList}>
                    {boardData.replies && boardData.replies.length > 0 ? (
                        boardData.replies.map((reply) => (
                            <div key={reply.id} className={styles.replyItem}>
                                <div className={styles.replyHeader}>
                                    <span className={styles.replyAuthor}>{reply.author || '익명'}</span>
                                    <span className={styles.replyDate}>{reply.createdAt || '알 수 없음'}</span>
                                </div>
                                <p className={styles.replyContent}>{reply.content || '내용 없음'}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noReply}>댓글이 없습니다.</p>
                    )}
                </div>

                {/* 댓글 입력 */}
                <div className={styles.replyInput}>
                    <textarea
                        placeholder="댓글을 입력하세요"
                        className={styles.inputField}
                    ></textarea>
                    <button className={styles.submitButton}>댓글 작성</button>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;