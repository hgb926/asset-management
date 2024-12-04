import React, {useEffect} from 'react';
import styles from '../../styles/main/Dashboard.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {locationActions} from "../store/user/LocationSlice";
import {Link, useLocation} from "react-router-dom";

const Dashboard = () => {

    const userData = useSelector(state => state.userInfo.userData);
    const location = useLocation();
    console.log(location.pathname)

    const getActiveClass = (targetLocation) => {
        return location.pathname === targetLocation ? styles.active : ""; // 현재 상태와 비교하여 active 클래스 추가
    };


    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <div className={styles.profile}>
                    <p className={styles.welcome}>{userData.nickname}님</p>
                    <p className={styles.greeting}>환영합니다</p>
                </div>
                <nav className={styles.menu}>
                    <Link
                        to={"/"}
                        className={`${styles.menuItem} ${getActiveClass("/")}`}
                    >
                        가계부
                    </Link>
                    <Link
                        to={'/analysis'}
                        className={`${styles.menuItem} ${getActiveClass("/analysis")}`}
                    >
                        분석
                    </Link>
                    <Link
                        to={'/goal'}
                        className={`${styles.menuItem} ${getActiveClass("/goal")}`}
                    >
                        목표
                    </Link>
                    <Link
                        to={'/challenge'}
                        className={`${styles.menuItem} ${getActiveClass("/challenge")}`}
                    >
                        챌린지
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;