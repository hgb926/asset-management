import React from 'react';
import styles from '../../../styles/goal/GoalDescription.module.scss';
import {IoMdHappy} from "react-icons/io";
import {RiEmotionHappyLine} from "react-icons/ri";

const GoalDescription = ({currentGoal}) => {
    const formattedStartDate = new Date(currentGoal.startDate).toLocaleDateString('ko-KR');
    const formattedEndDate = new Date(currentGoal.endDate).toLocaleDateString('ko-KR');
    const today = new Date();
    const endDate = new Date(currentGoal.endDate);
    const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
    const dailyRequired = Math.max(
        0,
        ((currentGoal.targetAmount - currentGoal.influencedMoney) / remainingDays).toFixed(0)
    );

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
                    <strong>목표까지 하루 평균 지출 금액:</strong>
                    <span className={styles.bold}>{dailyRequired.toLocaleString('ko-KR')}원</span>
                </p>

                {/*<p>*/}
                {/*    <strong>현재 진행률:</strong>*/}
                {/*    <span className={styles.progressHighlight}>{currentGoal.currentProgress}%</span>*/}
                {/*</p>*/}
                <p>
                    <strong>기간:</strong> {formattedStartDate} ~ {formattedEndDate}
                </p>
                <p className={styles.motivation}>
                    {currentGoal.currentProgress < 50
                        ?
                        <>
                            <div>목표를 향해 꾸준히 나아가고 있어요!
                                <br/>조금만 더 힘내세요!
                            </div>
                            <IoMdHappy className={styles.emotion}/>
                        </>

                        : <>
                            <div>목표가 눈앞에 있습니다! 계속 달려봐요!
                            </div>
                            <RiEmotionHappyLine className={styles.emotion}/>
                        </>
                    }
                </p>
            </div>
        </div>
    );
};

export default GoalDescription;