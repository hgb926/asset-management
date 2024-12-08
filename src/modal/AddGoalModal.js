import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/goal/AddGoalModal.module.scss";

const AddGoalModal = ({ modalHandler }) => {
    const modalRef = useRef();

    const globalModalCloseHandler = (e) => {
        // 배경 클릭 시 모달 닫기
        if (modalRef.current && e.target === modalRef.current) {
            modalHandler(false);
        }
    };

    useEffect(() => {
        const closeOnEscapeKey = (e) => {
            if (e.key === "Escape") {
                modalHandler(false); // ESC 키로 모달 닫기
            }
        };
        document.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [modalHandler]);

    return ReactDOM.createPortal(
        <div
            className={styles.overlay} // 오버레이 스타일 추가
            ref={modalRef}
            onClick={globalModalCloseHandler}
        >
            <div className={styles.modalWrap}>
                <h1 className={styles.h1}>새로운 목표를 설정해주세요!</h1>
                <span
                    className={styles.closeButton}
                    onClick={() => modalHandler(false)}
                >
                    ×
                </span>
            </div>
        </div>,
        document.getElementById("modal-root") // Portal로 렌더링
    );
};

export default AddGoalModal;