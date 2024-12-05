import React from 'react';
import styles from '../../../styles/goal/AddGoalBtn.module.scss';
import AddGoalModal from "../../../modal/AddGoalModal";

const AddGoalBtn = () => {
    return (
        <>
            <div className={styles.addGoalBtnWrap}>
                목표 추가하기
            </div>
            <AddGoalModal />
        </>
    );
};

export default AddGoalBtn;