import React, {useState} from 'react';
import GoalHeader from "./GoalHeader";
import GoalAnalysis from "./GoalAnalysis";
import GoalDescription from "./GoalDescription";
import styles from '../../../styles/goal/Goal.module.scss';
import { useSelector } from "react-redux";
import HaveNotGoal from "./HaveNotGoal";

const Goal = () => {


    const userData = useSelector(state => state.userInfo.userData);
    const goalList = userData.goalList;


    const [currentIndex, setCurrentIndex] = useState(0); // 현재 목표의 인덱스를 저.

    const currentGoal = goalList[currentIndex]; // 현재 목표를 가져옴


    const changeCurrentGoal = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? goalList.length - 1 : prevIndex - 1
            );
        } else if (direction === 'next') {
            setCurrentIndex((prevIndex) =>
                prevIndex === goalList.length - 1 ? 0 : prevIndex + 1
            );
        }
    };


    return (
        <>
            {
                goalList.length > 0 ? (
                    <div className={styles.container}>
                        <GoalHeader
                            currentGoal={currentGoal}
                            changeCurrentGoal={changeCurrentGoal}
                            goalList={goalList}
                        />
                        <div className={styles.middleWrap}>
                            <GoalDescription currentGoal={currentGoal}/>
                            <GoalAnalysis currentGoal={currentGoal}/>
                        </div>
                    </div>
                ) : <HaveNotGoal/>
            }
        </>
    );
};

export default Goal;

