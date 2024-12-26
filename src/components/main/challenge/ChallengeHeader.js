import React from 'react';
import styles from "../../../styles/challenge/ChallengeHeader.module.scss";

const ChallengeHeader = () => {
    return (
        <>
            <h1 className={styles.h1}>챌린지 게시판!</h1>
            <div className={styles.header}>
                <div className={styles.sortSection}>
                    <div className={styles.dateSort}>
                        <p className={styles.text}>날짜</p>
                        <select className={styles.select}>
                            <option value="latest">최신순</option>
                            <option value="oldest">오래된순</option>
                        </select>
                    </div>
                    <div className={styles.categorySort}>
                        <p className={styles.text}>타입</p>
                        <select className={styles.select}>
                            <option value="expense">지출</option>
                            <option value="saving">저축</option>
                        </select>
                    </div>
                </div>
                <div className={styles.searchSection}>
                    <input type="text" className={styles.searchInput} placeholder="검색어를 입력하세요"/>
                    <span className={styles.search}>검색</span>
                </div>
            </div>
        </>
    );
};

export default ChallengeHeader;