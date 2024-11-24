import React from 'react';
import styles from '../../styles/main/Dashboard.module.scss'
import {useSelector} from "react-redux";

const Dashboard = () => {

    const userData = useSelector(state => state.userInfo.userData);


    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.profile}>
                    <p className={styles.welcome}>{userData.nickname}님</p>
                    <p className={styles.greeting}>환영합니다</p>
                </div>
                <nav className={styles.menu}>
                    {/*액티브*/}
                    {/*나중엔 가계부 제외 나머지는 Link태그로 이동*/}
                    <p className={styles.menuItem}>가계부</p>
                    <p className={styles.menuItem}>분석</p> {/*  /analysis  */}
                    <p className={styles.menuItem}>목표</p> {/*  /goal  */}
                    <p className={styles.menuItem}>챌린지</p> {/*  /challenge  */}
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;