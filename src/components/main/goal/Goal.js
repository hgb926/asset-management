import React from 'react';
import GoalHeader from "./GoalHeader";
import GoalChart from "./GoalChart";
import GoalDescription from "./GoalDescription";
import styles from '../../../styles/goal/Goal.module.scss'

const Goal = () => {
    return (
        <>
            <GoalHeader/>
            <div className={styles.goalWrap}>
                <GoalChart/>
                <GoalDescription/>
            </div>
        </>
    );
};

export default Goal;