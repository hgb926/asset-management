import React from 'react';
import styles from '../../../styles/goal/GoalDescription.module.scss';

const GoalDescription = ({ currentGoal }) => {
    const formattedStartDate = new Date(currentGoal.startDate).toLocaleDateString('ko-KR');
    const formattedEndDate = new Date(currentGoal.endDate).toLocaleDateString('ko-KR');

    return (
        <div className={styles.desWrap}>
            <h2 className={styles.goalCategory}>{currentGoal.category}</h2>
            <p className={styles.goalDescription}>{currentGoal.description}</p>
            <div className={styles.goalDetails}>
                <p>
                    <strong>목표 금액:</strong>
                    <span className={styles.amountHighlight}>{currentGoal.targetAmount.toLocaleString('ko-KR')}원</span>
                </p>
                <p>
                    <strong>
                        {currentGoal.type === "expense" ? "현재 사용 금액" : "현재 모은 금액"}:
                    </strong>
                    <span className={styles.amountHighlight}>
                        {currentGoal.influencedMoney.toLocaleString('ko-KR')}원
                    </span>
                </p>
                <p>
                    <strong>현재 진행률:</strong>
                    <span className={styles.progressHighlight}>{currentGoal.currentProgress}%</span>
                </p>
                <p>
                    <strong>기간:</strong> {formattedStartDate} ~ {formattedEndDate}
                </p>
                <p className={currentGoal.achieved ? styles.achieved : styles.notAchieved}>
                    {currentGoal.achieved ? "달성 완료 🎉" : "달성 중..."}
                </p>
            </div>
        </div>
    );
};

export default GoalDescription;