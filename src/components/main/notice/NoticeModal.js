import React from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss';
import ReactDOM from "react-dom";

const NoticeModal = ({ onClose }) => {

    const DUMMY_DATA = [
        {
            id: "1",
            user: "swings",
            message: "목표 달성까지 3일 남았어요! (현재 진행률 82.3%)",
            isClicked: true,
            createdAt: "2024년 11월 30일 오후 12시 6분"
        },
        {
            id: "2",
            user: "swings",
            message: "~~님께서 회원님께서 만든 챌린지에 동참하셨습니다.",
            isClicked: true,
            createdAt: "2024년 12월 12일 오후 6시 23분"
        },
        {
            id: "3",
            user: "hgb",
            message: "새로운 공지사항이 있습니다. 확인해 주세요!",
            isClicked: false,
            createdAt: "2024년 12월 15일 오전 10시 15분"
        },
        {
            id: "4",
            user: "admin",
            message: "서비스 점검이 예정되어 있습니다. (2024년 12월 20일)",
            isClicked: true,
            createdAt: "2024년 12월 15일 오후 2시 30분"
        },
        {
            id: "5",
            user: "swings",
            message: "친구 요청이 도착했습니다.",
            isClicked: true,
            createdAt: "2024년 12월 16일 오후 4시 45분"
        },
        {
            id: "6",
            user: "hgb",
            message: "이벤트 참여가 완료되었습니다.",
            isClicked: false,
            createdAt: "2024년 12월 17일 오전 9시 12분"
        },
        {
            id: "7",
            user: "swings",
            message: "새로운 댓글이 달렸습니다.",
            isClicked: true,
            createdAt: "2024년 12월 17일 오후 7시 55분"
        },
        {
            id: "8",
            user: "admin",
            message: "보안 업데이트가 완료되었습니다.",
            isClicked: false,
            createdAt: "2024년 12월 18일 오후 1시 20분"
        },
        {
            id: "9",
            user: "hgb",
            message: "프로필 사진이 성공적으로 변경되었습니다.",
            isClicked: false,
            createdAt: "2024년 12월 18일 오후 3시 40분"
        },
        {
            id: "10",
            user: "swings",
            message: "공지사항: 시스템 안정화 작업이 완료되었습니다.",
            isClicked: true,
            createdAt: "2024년 12월 19일 오전 11시 5분"
        },
        {
            id: "11",
            user: "hgb",
            message: "새로운 챌린지가 시작되었습니다. 참여해보세요!",
            isClicked: false,
            createdAt: "2024년 12월 19일 오후 5시 25분"
        },
        {
            id: "12",
            user: "admin",
            message: "긴급: 서비스 이용약관이 변경되었습니다.",
            isClicked: true,
            createdAt: "2024년 12월 20일 오전 8시 50분"
        }
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
                    {DUMMY_DATA.map((data) => (
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