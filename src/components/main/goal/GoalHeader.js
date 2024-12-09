import React from 'react';
import AddGoalBtn from "./AddGoalBtn";
import styles from '../../../styles/goal/GoalHeader.module.scss'

const GoalHeader = () => {
    return (
        <div className={styles.headerContainer}>

            <AddGoalBtn/>
        </div>
    );
};

export default GoalHeader;