import React, {useRef, useState} from 'react';
import styles from '../../styles/main/Header.module.scss'
import {useDispatch} from "react-redux";
import {userInfoActions} from "../store/user/UserInfoSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {GoBell} from "react-icons/go";
import NoticeModal from "./notice/NoticeModal";
import ReactDOM from "react-dom";

const Header = () => {

    const navi = useNavigate();
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const containerRef = useRef();

    const [modalOpen, setModalOpen] = useState(false)


    const logoutHandler = () => {
        dispatch(userInfoActions.updateUser({ isEmpty : true}));
        // 로컬에서도 없애줌
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        navi('/login')
    }

    const homeHandler = () => {
        if (pathname !== "/") {
            navi("/")
        }
    }


    return (
        <>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.left}></div>
                <h1 className={styles.h1} onClick={homeHandler}>Asset Management</h1>
                <div className={styles.right}>
                    <div className={styles.welcome}>
                        <span>마이페이지</span>
                        <span>/</span>
                        <span onClick={logoutHandler}>로그아웃</span>
                    </div>
                    <div className={styles.noticeWrap}>
                        <GoBell
                            onClick={() => setModalOpen(!modalOpen)}
                            className={styles.notice}
                        />
                        <span className={styles.noticeCircle}></span>
                    </div>
                </div>
            </div>
            {modalOpen ? <NoticeModal onClose={() => setModalOpen(false)}/> : ""}
        </>
    );
};

export default Header;