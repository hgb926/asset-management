import React from 'react';
import {Link} from "react-router-dom";
import styles from '../../../styles/challenge/Challenge.module.scss'

const Challenge = () => {
    return (
        <div className={styles.wrap}>
            <h1>챌린지 게시판!</h1>
            <div className={styles.header}>
                <div className={styles.sortSection}>
                    <div className={styles.dateSort}>
                        <p>날짜</p>
                        <select>
                            <option value={"latest"}>최신순</option>
                            <option value={"oldest"}>오래된순</option>
                        </select>
                    </div>
                    <div className={styles.categorySort}>
                        <p>타입</p>
                        <select>
                            <option value={'expense'}>지출</option>
                            <option value={'saving'}>저축</option>
                        </select>
                    </div>
                </div>
                <div className={styles.searchSection}>
                    <input type={'text'} className={styles.searchInput}/>
                    <span>검색</span>
                </div>
            </div>
        </div>
    );
};

export default Challenge;