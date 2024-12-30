import React, {useEffect, useRef, useState} from 'react';
import styles from '../../styles/main/Header.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {userInfoActions} from "../store/user/UserInfoSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {GoBell} from "react-icons/go";
import NoticeModal from "./notice/NoticeModal";

import {NOTICE_URL, SSE_URL} from "../../config/host-config";

const Header = () => {

    const [noticeList, setNoticeList] = useState([]);
    const [isGotNewNotice, setIsGotNewNotice] = useState(false)
    const navi = useNavigate();
    const {pathname} = useLocation();
    const {id} = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();
    const containerRef = useRef();

    const [modalOpen, setModalOpen] = useState(false)

    const getNoticeList = async () => {
        try {
            const response = await fetch(`${NOTICE_URL}/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch notice');
            }
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchNoticeList = async () => {
            const data = await getNoticeList();
            setNoticeList(data);
        };

        fetchNoticeList();

        // SSE 연결
        const eventSource = new EventSource(`${SSE_URL}/connect/${id}`);

        eventSource.addEventListener('notice', (e) => {
            const newNotice = JSON.parse(e.data);

            setNoticeList(prev => [...prev, newNotice]); // 알림 목록에 추가
            setIsGotNewNotice(true); // 새로운 알림이 오면 즉시 true로 설정
        });

        eventSource.onerror = (e) => {
            console.error('SSE Error:', e);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    useEffect(() => {
        const hasUnreadNotice = noticeList.some(notice => !notice.clicked);
        setIsGotNewNotice(hasUnreadNotice);
    }, [noticeList]);

    const getReadStatus = (flag) => {
        setIsGotNewNotice(flag)
    }

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
                        { isGotNewNotice ? <span className={styles.noticeCircle}></span> : ""}
                    </div>
                </div>
            </div>
            {modalOpen ? <NoticeModal
                getReadStatus={getReadStatus}
                onClose={() => setModalOpen(false)}
            /> : ""}
        </>
    );
};

export default Header;