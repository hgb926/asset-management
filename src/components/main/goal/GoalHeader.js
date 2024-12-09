import React, { useState } from 'react';
import AddGoalBtn from './AddGoalBtn';
import styles from '../../../styles/goal/GoalHeader.module.scss';
import { useSelector } from 'react-redux';

const GoalHeader = () => {
    const userData = useSelector((state) => state.userInfo.userData);
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 목표의 인덱스를 저장합니다.

    const currentGoal = userData.goalList[currentIndex]; // 현재 목표를 가져옵니다.

    const formatHeaderText = (category, type, amount) => {
        return type === 'income'
            ? `${amount.toLocaleString('ko-KR')}원 저축`
            : `${category} ${amount.toLocaleString('ko-KR')}원 지출`;
    };

    const changeCurrentGoal = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? userData.goalList.length - 1 : prevIndex - 1
            );
        } else if (direction === 'next') {
            setCurrentIndex((prevIndex) =>
                prevIndex === userData.goalList.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    return (
        <div className={styles.headerContainer}>
            <button
                className={styles.navButton}
                onClick={() => changeCurrentGoal('prev')}
            >
                이전 목표
            </button>
            <h2 className={styles.h2}>
                {formatHeaderText(
                    currentGoal.category,
                    currentGoal.type,
                    currentGoal.targetAmount
                )}
            </h2>
            <button
                className={styles.navButton}
                onClick={() => changeCurrentGoal('next')}
            >
                다음 목표
            </button>

            <AddGoalBtn />
        </div>
    );
};

export default GoalHeader;