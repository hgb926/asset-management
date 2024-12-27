import React, { useState, useEffect } from 'react';
import styles from '../../../styles/board/BoardDetail.module.scss';
import { useParams } from 'react-router-dom';
import { BOARD_URL } from '../../../config/host-config';
import { formatRelativeTime } from "../../../util/timeFormater";
import ReplySection from "./ReplySection";

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
           <ReplySection
               boardId={boardData.id}
               replies={boardData.replies}
           />
        </div>
    );
};

export default BoardDetail;