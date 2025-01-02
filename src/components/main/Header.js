import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/main/Header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "../store/user/UserInfoSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { GoBell } from "react-icons/go";
import NoticeModal from "./notice/NoticeModal";

import { NOTICE_URL, SSE_URL } from "../../config/host-config";

const Header = () => {
    const [noticeList, setNoticeList] = useState([]);
    const [isGotNewNotice, setIsGotNewNotice] = useState(false);
    const isGotNewNoticeRef = useRef(false); // 안정적인 상태 관리
    const [modalOpen, setModalOpen] = useState(false);

    const navi = useNavigate();
    const { pathname } = useLocation();
    const { id } = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();
    const containerRef = useRef();
    const eventSourceRef = useRef(null); // SSE 인스턴스 참조

    // 알림 목록 가져오기
    const getNoticeList = async () => {
        try {
            const response = await fetch(`${NOTICE_URL}/${id}`);
            if (!response.ok) throw new Error('Failed to fetch notices');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        }
    };

    // SSE 연결 및 재연결
    const connectSSE = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }

        eventSourceRef.current = new EventSource(`${SSE_URL}/connect/${id}`);

        eventSourceRef.current.addEventListener('notice', (e) => {
            try {
                const newNotice = JSON.parse(e.data);
                setNoticeList(prev => {
                    const updatedList = [...prev, newNotice];
                    const hasUnread = updatedList.some(notice => !notice.clicked);
                    isGotNewNoticeRef.current = hasUnread;
                    setIsGotNewNotice(hasUnread);
                    return updatedList;
                });
            } catch (parseError) {
                console.error("JSON Parsing Error:", parseError, e.data);
            }
        });

        eventSourceRef.current.onerror = (e) => {
            console.error('SSE Error:', e);
            eventSourceRef.current.close();
            setTimeout(connectSSE, 3000); // 3초 후 재연결
        };
    };

    // 초기 알림 목록 및 SSE 연결
    useEffect(() => {
        if (!id) return;

        const fetchNoticeList = async () => {
            const data = await getNoticeList();
            setNoticeList(data || []);
            const hasUnread = data?.some(notice => !notice.clicked);
            isGotNewNoticeRef.current = hasUnread;
            setIsGotNewNotice(hasUnread);
        };

        fetchNoticeList();
        connectSSE();

        return () => {
            eventSourceRef.current?.close();
        };
    }, [id]);

    // 알림 목록 변경 시 상태 업데이트
    useEffect(() => {
        const hasUnreadNotice = noticeList.some(notice => !notice.clicked);
        isGotNewNoticeRef.current = hasUnreadNotice;
        setIsGotNewNotice(hasUnreadNotice);
    }, [noticeList]);

    // 알림 읽음 상태 처리
    const getReadStatus = (flag) => {
        isGotNewNoticeRef.current = flag;
        setIsGotNewNotice(flag);
    };

    // 로그아웃
    const logoutHandler = () => {
        dispatch(userInfoActions.updateUser({ isEmpty: true }));
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        navi('/login');
    };

    // 홈으로 이동
    const homeHandler = () => {
        if (pathname !== "/") {
            navi("/");
        }
    };

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
                        {isGotNewNotice && (
                            <span className={styles.noticeCircle}></span>
                        )}
                    </div>
                </div>
            </div>
            {modalOpen && (
                <NoticeModal
                    getReadStatus={getReadStatus}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default Header;