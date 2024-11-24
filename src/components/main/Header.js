import React from 'react';
import styles from '../../styles/main/Header.module.scss'
import {IoSettingsOutline} from "react-icons/io5";
import {useSelector} from "react-redux";
import {userInfoActions} from "../store/user/UserInfoSlice";

const Header = () => {

    const userData = useSelector(state => state.userInfo.userData) || {};
    console.log(userData)


    return (
        <div className={styles.container}>
            <div className={styles.left}></div>
            <h1 className={styles.h1}>Asset Management</h1>
            <div className={styles.right}>
                <div className={styles.welcome}>
                    <span>마이페이지</span>
                    <span>/</span>
                    <span>로그아웃</span>
                </div>
                <IoSettingsOutline className={styles.settings} />
            </div>
        </div>
    );
};

export default Header;