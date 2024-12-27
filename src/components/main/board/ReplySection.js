import React, {useEffect, useRef, useState} from 'react';
import styles from "../../../styles/board/BoardDetail.module.scss";
import { formatRelativeTime } from "../../../util/timeFormater";
import {useSelector} from "react-redux";
import {REPLY_URL} from "../../../config/host-config";

const ReplySection = ({ boardId, replies }) => {

    const [localReplies, setLocalReplies] = useState(replies);
    const now = new Date()
    const { id, nickname } = useSelector(state => state.userInfo.userData);
    const contentRef = useRef();

    useEffect(() => {
        if (replies) {
            setLocalReplies(replies);
        }
    }, [replies]);


    const replySubmitHandler = async () => {
        const content = contentRef.current.value;
        if (!content) return alert("댓글을 입력하세요")
        const payload = {
            userId: id,
            boardId,
            content
        }
        const newReply = {
            id: Date.now(), // 임시 ID
            author: nickname || '익명',
            createdAt: new Date().toISOString(),
            content: content,
        };
        await fetch(`${REPLY_URL}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        })


        // 새 댓글 추가
        setLocalReplies((prevReplies) => [...prevReplies, newReply]);

        // 입력창 비우기
        contentRef.current.value = '';
    }


    return (
        <div className={styles.replySection}>
            <h2>댓글 ({localReplies.length || 0})</h2>
            <div id={"replywrap"} className={styles.replyList}>
                { localReplies.length > 0 ? (
                    localReplies.map((reply) => (
                        <div key={reply.id} className={styles.replyItem}>
                            <div className={styles.replyHeader}>
                                <span className={styles.replyAuthor}>{reply.author || '익명'}</span>
                                <span className={styles.replyDate}>{formatRelativeTime(now - new Date(reply.createdAt)) || '알 수 없음'}</span>
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
                        ref={contentRef}
                        placeholder="댓글을 입력하세요"
                        className={styles.inputField}
                    ></textarea>
                <div
                    onClick={replySubmitHandler}
                    className={styles.submitButton}
                >댓글 작성</div>
            </div>
        </div>
    );
};

export default ReplySection;