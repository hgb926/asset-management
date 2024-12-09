import React from 'react';
import AddGoalBtn from "./AddGoalBtn";
import styles from '../../../styles/goal/GoalHeader.module.scss'
import {useSelector} from "react-redux";

const GoalHeader = () => {

    const userData = useSelector(state => state.userInfo.userData);

    for (let i = 0; i < userData.goalList.length; i++) {
        console.log(userData.goalList[i])
    }

    return (
        <div className={styles.headerContainer}>



            <AddGoalBtn/>
        </div>
    );
};

export default GoalHeader;