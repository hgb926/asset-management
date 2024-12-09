import React from 'react';
import GoalHeader from "./GoalHeader";
import GoalChart from "./GoalChart";
import GoalDescription from "./GoalDescription";
import styles from '../../../styles/goal/Goal.module.scss';
import { useSelector } from "react-redux";
import HaveNotGoal from "./HaveNotGoal";

const Goal = () => {
    const userData = useSelector(state => state.userInfo.userData);
    const goalList = userData.goalList;

    return (
        <>
            {
                goalList.length > 0 ? (
                    <div className={styles.container}>
                        <GoalHeader />
                        <div className={styles.middleWrap}>
                            <GoalChart />
                            <GoalDescription />
                        </div>
                    </div>
                ) : <HaveNotGoal/>
            }
        </>
    );
};

export default Goal;

