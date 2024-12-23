import React from 'react';
import styles from '../../../styles/notice/NoticeModal.module.scss'
import ReactDOM from "react-dom";

const NoticeModal = () => {
    return ReactDOM.createPortal(
        <div className={styles.modalWrap}>
            <div></div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default NoticeModal;