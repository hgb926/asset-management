import React from 'react';
import AddGoalBtn from "./AddGoalBtn";
import styles from '../../../styles/goal/HaveNotGoal.module.scss';

const HaveNotGoal = () => {



    return (
        <div className={styles.haveNotGoalWrap}>
            <div className={styles.message}>
                아직 목표가 없습니다! 😅
            </div>
            <AddGoalBtn />
        </div>
    );
};

export default HaveNotGoal;