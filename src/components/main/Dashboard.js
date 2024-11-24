import React, {useEffect} from 'react';
import styles from '../../styles/main/Dashboard.module.scss'
import {useDispatch, useSelector} from "react-redux";
import locationSlice, {locationActions} from "../store/user/LocationSlice";

const Dashboard = () => {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userInfo.userData);
    const location = useSelector(state => state.location.userLocation);

    useEffect(() => {
        console.log(location)
    }, [location]);

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
                    <p
                        onClick={() => dispatch(locationActions.updateUserLocation("accountBook"))}
                        className={styles.menuItem}>
                        가계부
                    </p>
                    <p
                        onClick={() => dispatch(locationActions.updateUserLocation("analysis"))}
                        className={styles.menuItem}>
                        분석
                    </p> {/*  /analysis  */}
                    <p
                        onClick={() => dispatch(locationActions.updateUserLocation("goal"))}
                        className={styles.menuItem}>
                        목표
                    </p> {/*  /goal  */}
                    <p
                        onClick={() => dispatch(locationActions.updateUserLocation("challenge"))}
                        className={styles.menuItem}>
                        챌린지
                    </p> {/*  /challenge  */}
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;