import React, {useEffect} from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss';
import ReactDOM from "react-dom";

const NoticeModal = ({ onClose }) => {

    const noticeList = [
        {
            id: "1",
            user: "swings",
            message: "목표 달성까지 3일 남았어요! (현재 진행률 82.3%)",
            isClicked: true,
            createdAt: "2024년 11월 30일 오후 12시 6분"
        },

    ];

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
                    {noticeList.map((data) => (
                        <div
                            key={data.id}
                            className={`${styles.notificationItem} ${!data.isClicked ? styles.unread : styles.read}`}
                        >
                            <div className={styles.user}>{data.user}</div>
                            <div className={styles.message}>{data.message}</div>
                            <div className={styles.date}>{data.createdAt}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;