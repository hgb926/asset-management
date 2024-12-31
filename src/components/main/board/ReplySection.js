import React, {useEffect, useRef, useState} from 'react';
import styles from "../../../styles/board/BoardDetail.module.scss";
import {formatRelativeTime} from "../../../util/timeFormater";
import {useSelector} from "react-redux";
import {REACTION_URL, REPLY_URL} from "../../../config/host-config";
import {addNotice} from '../../../util/noticeUtil';
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";

const ReplySection = ({boardId, replies, authorId, deleteHandler}) => {
    const [localReplies, setLocalReplies] = useState(replies || []);
    const [active, setActive] = useState(false);
    const now = new Date();
    const {id, nickname} = useSelector(state => state.userInfo.userData);
    const contentRef = useRef();

    useEffect(() => {
        if (replies) {
            setLocalReplies(replies);
        }
    }, [replies]);

    const replySubmitHandler = async () => {
        const content = contentRef.current.value;
        if (!content) return alert("댓글을 입력하세요");

        const payload = {
            userId: id,
            boardId,
            content
        };

        const response = await fetch(`${REPLY_URL}`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const newReply = {
                id: Date.now(),
                author: nickname || '익명',
                createdAt: new Date().toISOString(),
                content: content,
                likeCount: 0,
                dislikeCount: 0,
                reactions: []
            };

            setLocalReplies(prevReplies => [...prevReplies, newReply]);
            contentRef.current.value = '';

            if (authorId !== id) {
                addNotice(authorId, '커뮤니티', boardId, `${nickname}님께서 회원님의 게시글에 댓글을 남겼습니다.`);
            }
        }
    };

    const activeHandler = () => {
        if (contentRef.current.value.length > 1) setActive(true);
        else setActive(false);
    };

    const reactionHandler = async (type, replyId) => {
        const payload = {
            boardId: 0,
            replyId,
            userId: id,
            reactionType: type,
            targetType: "REPLY"
        };

        const response = await fetch(`${REACTION_URL}`, {
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            setLocalReplies(prevReplies =>
                prevReplies.map(reply => {
                    if (reply.id === replyId) {
                        if (type === "LIKE") {
                            return {...reply, likeCount: reply.likeCount + 1};
                        } else {
                            return {...reply, dislikeCount: reply.dislikeCount + 1};
                        }
                    }
                    return reply;
                })
            );
        }
    };


    return (
        <div className={styles.replySection}>
            <h2>댓글 ({localReplies.length || 0})</h2>
            <div className={styles.replyList}>
                {localReplies.length > 0 ? (
                    localReplies.slice().reverse().map((reply) => (
                        <div key={reply.id} className={styles.replyItem}>
                            <div className={styles.replyHeader}>
                                <span className={styles.replyAuthor}>{reply.author || '익명'}</span>
                                <div>
                                    <div className={styles.replyDate}>
                                        {formatRelativeTime(now - new Date(reply.createdAt)) || '알 수 없음'}
                                    </div>
                                    {reply.authorId === id && <div className={styles.modifyAndDelete}>
                                        <span
                                            className={styles.delete}
                                            onClick={() => deleteHandler("reply", reply.id, boardId)}
                                        >
                                            삭제
                                        </span>
                                    </div>}
                                </div>
                            </div>
                            <div className={styles.bottomWrap}>
                                <p className={styles.replyContent}>{reply.content || '내용 없음'}</p>
                                <div className={styles.replyActions}>
                                    <div className={styles.actionItem}>
                                        <AiOutlineLike
                                            className={styles.actionIcon}
                                            onClick={() => reactionHandler("LIKE", reply.id)}
                                        />
                                        <span className={styles.actionCount}>{reply.likeCount}</span>
                                    </div>
                                    <div className={styles.actionItem}>
                                        <AiOutlineDislike
                                            className={styles.actionIcon}
                                            onClick={() => reactionHandler("DISLIKE", reply.id)}
                                        />
                                        <span className={styles.actionCount}>{reply.dislikeCount}</span>
                                    </div>
                                </div>
                            </div>
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
                    onChange={activeHandler}
                ></textarea>
                <div
                    onClick={replySubmitHandler}
                    className={`${active ? styles.active : styles.noneActive}`}
                >
                    댓글 작성
                </div>
            </div>
        </div>
    );
};

export default ReplySection;