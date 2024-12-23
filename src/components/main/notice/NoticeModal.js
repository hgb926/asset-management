import React from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss'
import ReactDOM from "react-dom";

const NoticeModal = ({onClose}) => {

    const DUMMY_DATA = [
        {
            id: "1",
            user: "swings",
            message: "목표 달성까지 3일 남았어요! (현재 진행률 82.3%)",
            isClicked: false,
            createdAt: "2024년 11월 30일 오후 12시 6분"
        },
        {
            id: "2",
            user: "swings",
            message: "~~님께서 회원님께서 만든 챌린지에 동참하셨습니다.",
            isClicked: false,
            createdAt: "2024년 12월 12일 오후 6시 23분"
        },
    ]

    return ReactDOM.createPortal(
        <div
            className={styles.modalOverlay}
            onClick={() => onClose()}
        >
            <div className={styles.modalWrap}>
                {DUMMY_DATA.map((data) => (
                    <div key={data.id}>
                        <div>{data.user}</div>
                        <div>{data.message}</div>
                        <div>{data.createdAt}</div>
                    </div>
                ))}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;