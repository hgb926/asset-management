import React, {useState} from 'react';
import styles from '../../styles/main/Header.module.scss'
import {useDispatch} from "react-redux";
import {userInfoActions} from "../store/user/UserInfoSlice";
import {useNavigate} from "react-router-dom";
import {GoBell} from "react-icons/go";
import NoticeModal from "./notice/NoticeModal";

const Header = () => {

    const navi = useNavigate();
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false)


    const logoutHandler = () => {
        dispatch(userInfoActions.updateUser({ isEmpty : true}));
        // 로컬에서도 없애줌
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        navi('/login')
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.left}></div>
                <h1 className={styles.h1}>Asset Management</h1>
                <div className={styles.right}>
                    <div className={styles.welcome}>
                        <span>마이페이지</span>
                        <span>/</span>
                        <span onClick={logoutHandler}>로그아웃</span>
                    </div>
                    <GoBell onClick={() => setModalOpen(!modalOpen)}
                            className={styles.notice}/>
                </div>
            </div>
            {modalOpen ? <NoticeModal/> : ""}
        </>
    );
};

export default Header;