import React, {useEffect, useState} from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss';
import ReactDOM from "react-dom";
import {useSelector} from "react-redux";
import {NOTICE_URL} from "../../../config/host-config";
import { formatRelativeTime } from "../../../util/timeFormater";

const NoticeModal = ({ onClose }) => {

    const [noticeList, setNoticeList] = useState([])
    const now = new Date();

    const { id } = useSelector(state => state.userInfo.userData);

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

    useEffect(() => {
        const fetchNoticeList = async () => {
            const data = await getNoticeList()
            setNoticeList(data);
        }
        fetchNoticeList();
    }, []);


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
                            key={notice.id}
                            className={`${styles.notificationItem} ${!notice.isClicked ? styles.read : styles.unread}`}
                        >
                            <div className={styles.user}>{notice.user}</div>
                            <div className={styles.message}>{notice.message}</div>
                            <div className={styles.date}>{formatRelativeTime(diffInMs)}</div>
                        </div>
                    )})}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;