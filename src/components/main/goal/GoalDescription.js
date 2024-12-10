import React from 'react';
import styles from '../../../styles/goal/GoalDescription.module.scss';

const GoalDescription = ({ currentGoal }) => {
    return (
        <div className={styles.desWrap}>
            <h2 className={styles.goalCategory}>{currentGoal.category}</h2>
            <p className={styles.goalDescription}>{currentGoal.description}</p>
            <div className={styles.goalDetails}>
                <p>
                    <strong>목표 금액:</strong> {currentGoal.targetAmount.toLocaleString('ko-KR')}원
                </p>
                <p>
                    <strong>현재 진행률:</strong> {currentGoal.currentProgress}%
                </p>
                <p>
                    <strong>기간:</strong> {currentGoal.startDate} ~ {currentGoal.endDate}
                </p>
                <p className={currentGoal.achieved ? styles.achieved : styles.notAchieved}>
                    {currentGoal.achieved ? "달성 완료 🎉" : "달성 중..."}
                </p>
            </div>
        </div>
    );
};

export default GoalDescription;