import React from 'react';
import styles from "../../../styles/board/BoardHeader.module.scss";

const BoardHeader = ({ boardList }) => {
    console.log(boardList)
    return (
        <>
            <h1 className={styles.h1}>💰 경제/재테크 커뮤니티</h1>
            <p className={styles.description}>
                경제 꿀팁을 공유하고 함께 성장해요!<br/>

            </p>
            <div className={styles.header}>
                <div className={styles.sortSection}>
                    <div className={styles.dateSort}>
                        <p className={styles.text}>정렬</p>
                        <select className={styles.select}>
                            <option value="latest">최신순</option>
                            <option value="oldest">오래된순</option>
                            <option value="reply">댓글 많은 순</option>
                            <option value="viewCount">조회수 많은 순</option>
                        </select>
                    </div>
                    <div className={styles.categorySort}>
                        <p className={styles.text}>카테고리</p>
                        <select className={styles.select}>
                            <option value="qna">질문</option>
                            <option value="tip">꿀팁</option>
                            <option value="info">정보</option>
                        </select>
                    </div>
                </div>
                <div className={styles.searchSection}>
                    <div className={styles.categorySort}>
                        <select className={styles.select}>
                            <option value="title">제목</option>
                            <option value="titleAndContent">제목+내용</option>
                            <option value="author">작성자</option>
                        </select>
                    </div>
                    <input type="text" className={styles.searchInput} placeholder="검색어를 입력하세요"/>
                    <span className={styles.search}>검색</span>
                </div>
            </div>
        </>
    );
};

export default BoardHeader;