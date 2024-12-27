import React from 'react';
import styles from '../../../styles/board/BoardDetail.module.scss';

const BoardDetail = () => {
    const data =  {
        id: 7,
        title: '재테크 꿀팁 공유합니다!',
        content: '이번 달에 알게 된 재테크 팁을 공유합니다. 모두 함께 부자 되어봐요!',
        author: '스윙스',
        createdAt: '2024-12-27T12:34:57.064472',
        viewCount: 123,
        replyCount: 3,
        replies: [
            { id: 1, author: 'user1', content: '좋은 정보 감사합니다!', createdAt: '5분 전' },
            { id: 2, author: 'user2', content: '더 자세히 알고 싶어요!', createdAt: '10분 전' },
            { id: 3, author: 'user3', content: '재테크 초보인데 도움이 되네요.', createdAt: '30분 전' }
        ]
    };

    return (
        <div className={styles.detailWrap}>
            {/* 게시글 정보 */}
            <div className={styles.header}>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.info}>
                    <span>작성자: {data.author}</span>
                    <span>작성일: {data.createdAt}</span>
                    <span>조회수: {data.viewCount}</span>
                </div>
            </div>

            {/* 게시글 내용 */}
            <div className={styles.content}>
                <p>{data.content}</p>
            </div>

            {/* 댓글 섹션 */}
            <div className={styles.replySection}>
                <h2>댓글 ({data.replyCount})</h2>
                <div className={styles.replyList}>
                    {data.replies.map((reply) => (
                        <div key={reply.id} className={styles.replyItem}>
                            <div className={styles.replyHeader}>
                                <span className={styles.replyAuthor}>{reply.author}</span>
                                <span className={styles.replyDate}>{reply.createdAt}</span>
                            </div>
                            <p className={styles.replyContent}>{reply.content}</p>
                        </div>
                    ))}
                </div>

                {/* 댓글 입력 */}
                <div className={styles.replyInput}>
                    <textarea placeholder="댓글을 입력하세요" className={styles.inputField}></textarea>
                    <button className={styles.submitButton}>댓글 작성</button>
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;