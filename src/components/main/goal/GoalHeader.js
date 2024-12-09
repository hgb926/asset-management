import React, {useState} from 'react';
import AddGoalBtn from "./AddGoalBtn";
import styles from '../../../styles/goal/GoalHeader.module.scss'
import {useSelector} from "react-redux";

const GoalHeader = () => {

    const userData = useSelector(state => state.userInfo.userData);
    const [currentGoal, setCurrentGoal] = useState(userData.goalList[0])

    for (let i = 0; i < userData.goalList.length; i++) {
        console.log(userData.goalList[i])
    }

    const formatHeaderText = (category, type, amount) => {
        return type === "income" ? `${amount.toLocaleString('ko-KR')}원 저축`
            : `${category} ${amount.toLocaleString('ko-KR')}원 지출`
    }


    return (
        <div className={styles.headerContainer}>
            <button className={styles.navButton} >
                이전 목표
            </button>
            <h2 className={styles.h2}>
                {formatHeaderText(currentGoal.category, currentGoal.type, currentGoal.targetAmount)}
            </h2>
            <button className={styles.navButton} >
                다음 목표
            </button>


            <AddGoalBtn/>
        </div>
    );
};

export default GoalHeader;