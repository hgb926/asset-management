import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, onClose }) => {
    if (!selectedDate) return null; // 날짜가 선택되지 않으면 모달을 렌더링하지 않음

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>{selectedDate} 지출 내역</h2>
                <span
                    className={styles.close}
                    onClick={onClose}
                >x</span>
                <p>여기에 지출 내역을 추가하세요.</p>
            </div>
        </div>
    );
};

export default AccountModal;