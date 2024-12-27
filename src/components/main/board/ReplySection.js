import React from 'react';
import styles from "../../../styles/board/BoardDetail.module.scss";
import { formatRelativeTime } from "../../../util/timeFormater";

const ReplySection = ({ replies }) => {

    const now = new Date()

    console.log(replies)

    return (
        <div className={styles.replySection}>
            <h2>댓글 ({replies.length || 0})</h2>
            <div className={styles.replyList}>
                {replies && replies.length > 0 ? (
                    replies.map((reply) => (
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
                        placeholder="댓글을 입력하세요"
                        className={styles.inputField}
                    ></textarea>
                <button className={styles.submitButton}>댓글 작성</button>
            </div>
        </div>
    );
};

export default ReplySection;