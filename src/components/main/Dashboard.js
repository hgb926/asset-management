import React, {useEffect} from 'react';
import styles from '../../styles/main/Dashboard.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {locationActions} from "../store/user/LocationSlice";
import {Link} from "react-router-dom";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userInfo.userData);
    const location = useSelector(state => state.location.userLocation);

    const getActiveClass = (targetLocation) => {
        return location === targetLocation ? styles.active : ""; // 현재 상태와 비교하여 active 클래스 추가
    };

    useEffect(() => {

    }, [location]);

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
                        onClick={() => dispatch(locationActions.updateUserLocation("accountBook"))}
                        className={`${styles.menuItem} ${getActiveClass("accountBook")}`}
                    >
                        가계부
                    </Link>
                    <Link
                        to={'/analysis'}
                        onClick={() => dispatch(locationActions.updateUserLocation("analysis"))}
                        className={`${styles.menuItem} ${getActiveClass("analysis")}`}
                    >
                        분석
                    </Link>
                    <Link
                        to={'/goal'}
                        onClick={() => dispatch(locationActions.updateUserLocation("goal"))}
                        className={`${styles.menuItem} ${getActiveClass("goal")}`}
                    >
                        목표
                    </Link>
                    <Link
                        to={'/challenge'}
                        onClick={() => dispatch(locationActions.updateUserLocation("challenge"))}
                        className={`${styles.menuItem} ${getActiveClass("challenge")}`}
                    >
                        챌린지
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;