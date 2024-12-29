import React, { useState, useEffect } from 'react';
import styles from '../../../styles/board/BoardDetail.module.scss';
import { useParams } from 'react-router-dom';
import {BOARD_URL, REACTION_URL} from '../../../config/host-config';
import { formatRelativeTime } from "../../../util/timeFormater";
import ReplySection from "./ReplySection";
import {IoMdEye} from "react-icons/io";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {useSelector} from "react-redux";

const BoardDetail = () => {
    const [boardData, setBoardData] = useState({ replies: [] }); // 초기값 설정
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const params = useParams();
    const boardId = params.id;
    const now = new Date();
    const { id } = useSelector(state => state.userInfo.userData);

    const getBoardDetail = async () => {
        try {
            const response = await fetch(`${BOARD_URL}/${boardId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch board detail');
            }

            const data = await response.json();
            setBoardData(data);
            setLike(data.likeCount)
            setDislike(data.dislikeCount)
        } catch (error) {
            console.error('Error fetching board detail:', error);
        }
    };

    useEffect(() => {
        getBoardDetail();
    }, [boardId]);

    const reactionHandler = async (type) => {
        const payload = {
            boardId,
            replyId: 0,
            userId: id,
            reactionType: type,
            targetType: "BOARD"
        }
        await fetch(`${REACTION_URL}`, {
            method: "POST",
            headers: { "Content-Type" : "Application/json" },
            body: JSON.stringify(payload)
        })

        if (type === "LIKE") {
            setLike(prev => prev + 1)
            setDislike(prev => prev - 1)
        } else if (type === "DISLIKE") {
            setDislike(prev => prev + 1)
            setLike(prev => prev - 1)
        }
    }


    return (
        <div className={styles.detailWrap}>
            {/* 게시글 정보 */}
            <div className={styles.header}>
                <h1 className={styles.title}>{boardData.title || '제목 없음'}</h1>
                <div className={styles.info}>
                    <div>
                        <div className={styles.author}>글쓴이: {boardData.author || '알 수 없음'}</div>
                        <span>{formatRelativeTime(now - new Date(boardData.createdAt)) || '알 수 없음'}</span></div>
                    <span>{boardData.createdAt}</span>
                    <span><IoMdEye className={styles.eyes}/> {boardData.viewCount || 0}</span>
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className={styles.contentWrap}>
                <p className={styles.content}>{boardData.content}</p>
            </div>

            <div className={styles.reactionContainer}>
                <div className={styles.reactionGroup}>
                    <AiOutlineLike
                        className={styles.reaction}
                        onClick={() => reactionHandler('LIKE')}
                    />
                    <span className={styles.count}>{like}</span>
                </div>
                <div className={styles.reactionGroup}>
                    <AiOutlineDislike
                        className={styles.reaction}
                        onClick={() => reactionHandler('DISLIKE')}
                    />
                    <span className={styles.count}>{dislike}</span>
                </div>
            </div>
            {/* 댓글 섹션 */}
            <ReplySection
                boardId={boardData.id}
                replies={boardData.replies}
                userId={boardData.authorId} // 작성자 id
            />
        </div>
    );
};

export default BoardDetail;