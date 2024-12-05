import React from 'react';
import styles from '../styles/goal/AddGoalModal.module.scss'

const AddGoalModal = ({ modalHandler }) => {


    return (
        <div className={styles.modalWrap}>
            <h1 className={styles.h1}>새로운 목표를 설정해주세요!</h1>
            <span className={styles.closeButton} onClick={() => modalHandler(false)}>×</span>
        </div>
    );
};

export default AddGoalModal;