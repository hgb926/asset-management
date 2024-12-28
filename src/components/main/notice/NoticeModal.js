import React, {useEffect, useState} from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss';
import ReactDOM from "react-dom";
import {useSelector} from "react-redux";
import {NOTICE_URL} from "../../../config/host-config";
import {formatRelativeTime} from "../../../util/timeFormater";
import {useNavigate} from "react-router-dom";

const NoticeModal = ({onClose}) => {

    const [noticeList, setNoticeList] = useState([])
    const now = new Date();
    const navi = useNavigate();
    const {id} = useSelector(state => state.userInfo.userData);

    const getNoticeList = async () => {
        try {
            const response = await fetch(`${NOTICE_URL}/${id}`)

            if (!response.ok) {
                throw new Error("Failed to fetch notice");
            }
            return await response.json();
        } catch (error) {
            console.error(error)
        }
    }

    const clickHandler = async (id, flag, type, boardId, goalId) => {

        if (!flag) {
            await fetch(`${NOTICE_URL}/${id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"}
            })
        }
        if (type === '커뮤니티') {
            navi(`/board/${boardId}`)
        } else if (type === '목표') {
            navi('/goal')
        }

        onClose()
    }

    useEffect(() => {
        const fetchNoticeList = async () => {
            const data = await getNoticeList()
            setNoticeList(data);
        }
        fetchNoticeList();
    }, []);

    console.log(noticeList)


    return ReactDOM.createPortal(
        <div
            className={styles.modalOverlay}
            onClick={() => onClose()}
        >
            <div className={styles.modalWrap} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>알림</h2>
                    <button onClick={onClose}>✖️</button>
                </div>
                <div className={styles.modalContent}>
                    {noticeList.reverse().map((notice) => {
                        const diffInMs = now - new Date(notice.createdAt)
                        return (
                            <div
                                onClick={() => clickHandler(notice.id, notice.clicked, notice.type, notice.boardId, notice.goalId)}
                                key={notice.id}
                                className={`${styles.notificationItem} ${!notice.clicked ? styles.read : styles.unread}`}
                            >
                                <div className={styles.user}>{notice.user}</div>
                                <div className={styles.message}>{notice.message}</div>
                                <div className={styles.date}>{formatRelativeTime(diffInMs)}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;