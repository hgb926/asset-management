import React from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss'
import ReactDOM from "react-dom";

const NoticeModal = ({ onClose }) => {
    return ReactDOM.createPortal(
        <div
            className={styles.modalOverlay}
            onClick={() => onClose()}
        >
            <div className={styles.modalWrap}>
                <div></div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;