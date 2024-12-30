import React, { useEffect, useState } from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import {NOTICE_URL, SSE_URL} from '../../../config/host-config';
import { formatRelativeTime } from '../../../util/timeFormater';
import { useNavigate } from 'react-router-dom';


const NoticeModal = ({ onClose, getReadStatus }) => {
    const [noticeList, setNoticeList] = useState([]);
    const now = new Date();
    const navi = useNavigate();
    const { id } = useSelector(state => state.userInfo.userData);

    // 알림 목록 가져오기
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

    // 알림 클릭 이벤트
    const clickHandler = async (noticeId, clicked, type, boardId, goalId) => {
        if (!clicked) {
            await fetch(`${NOTICE_URL}/${noticeId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            // 클릭된 알림 상태 업데이트
            setNoticeList(prev =>
                prev.map(notice =>
                    notice.id === noticeId ? { ...notice, clicked: true } : notice
                )
            );

            // 모든 알림이 클릭되었는지 확인
            const allRead = noticeList.every(notice => notice.id === noticeId || notice.clicked);
            getReadStatus(!allRead);
        }

        // 알림 타입에 따라 페이지 이동
        if (type === '커뮤니티') {
            navi(`/board/${boardId}`);
        } else if (type === '목표') {
            navi('/goal');
        }

        onClose();
    };

    const clickAllHandler = async () => {
        await fetch(`${NOTICE_URL}/all/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        setNoticeList(prev =>
            prev.map(n =>
                !n.clicked ? { ...n, clicked: true } : n
            )
        );

        getReadStatus(false); // 모든 알림이 읽혔음을 전달
    };

    // SSE 연결 및 실시간 알림 수신
    useEffect(() => {
        const fetchNoticeList = async () => {
            const data = await getNoticeList();
            setNoticeList(data || []);
        };

        fetchNoticeList();

        // SSE 연결
        const eventSource = new EventSource(`${SSE_URL}/connect/${id}`);

        eventSource.addEventListener('notice', (e) => {
            try {
                const newNotice = JSON.parse(e.data); // JSON 파싱
                setNoticeList(prev => [...prev, newNotice]);
            } catch (parseError) {
                console.error("JSON Parsing Error:", parseError, e.data);
            }
        });

        eventSource.onerror = (e) => {
            console.error('SSE Error:', e);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [id]);

    console.log(noticeList)
    return ReactDOM.createPortal(
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>알림</h2>
                    <button onClick={onClose}>✖️</button>
                </div>
                <div className={styles.modalContent}>
                    <p
                        className={styles.allRead}
                        onClick={clickAllHandler}
                    >모두 읽기</p>
                    {noticeList
                        .slice() // 원본 배열 변경 방지
                        .reverse()
                        .map((notice) => {
                            const diffInMs = now - new Date(notice.createdAt);
                            return (
                                <div
                                    onClick={() =>
                                        clickHandler(notice.id, notice.clicked, notice.type, notice.boardId, notice.goalId)
                                    }
                                    key={notice.id}
                                    className={`${styles.notificationItem} ${
                                        !notice.clicked ? styles.read : styles.unread
                                    }`}
                                >
                                    <div className={styles.user}>{notice.type || '시스템 알림'}</div>
                                    <div className={styles.message}>{notice.message}</div>
                                    <div className={styles.date}>{formatRelativeTime(diffInMs)}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default NoticeModal;