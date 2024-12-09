import React from 'react';
import AddGoalBtn from './AddGoalBtn';
import styles from '../../../styles/goal/GoalHeader.module.scss';

const GoalHeader = ({ currentGoal, changeCurrentGoal, goalList }) => {


    const formatHeaderText = (category, type, amount) => {
        return type === 'income'
            ? `${amount.toLocaleString('ko-KR')}원 저축`
            : `${category} ${amount.toLocaleString('ko-KR')}원 지출`;
    };

    return (
        <>
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

            </div>
            <div className={styles.forBottom}>
                <AddGoalBtn/>
            </div>
        </>
    );
};

export default GoalHeader;