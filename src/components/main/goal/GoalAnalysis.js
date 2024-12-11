import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import styles from '../../../styles/goal/GoalAnalysis.module.scss';

const GoalAnalysis = ({ currentGoal }) => {
    const today = new Date();
    const endDate = new Date(currentGoal.endDate);
    const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
    const dailyRequired = Math.max(
        0,
        ((currentGoal.targetAmount - currentGoal.influencedMoney) / remainingDays).toFixed(0)
    );

    // ProgressBar 데이터 계산
    const progressPercentage = Math.min(
        100,
        (currentGoal.influencedMoney / currentGoal.targetAmount) * 100
    ).toFixed(1);

    // Pie Chart 데이터
    const chartData = [
        {
            id: '현재 사용 금액',
            value: currentGoal.influencedMoney,
            color: currentGoal.type === "expense" ? '#2688f6' : '#E74B3C',
        },
        {
            id: '남은 목표 금액',
            value: currentGoal.targetAmount - currentGoal.influencedMoney,
            color: '#e0e0e0',
        },
    ];

    return (
        <div className={styles.analysisWrap}>
            {/* 차트 영역 */}
            <div className={styles.chartContainer}>
                <p className={styles.chartTitle}>목표 진행률</p>
                <div className={styles.chart}>
                    <ResponsivePie
                        data={chartData}
                        margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={({ data }) => data.color}
                        borderWidth={1}
                        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                        radialLabelsSkipAngle={10}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkColor={{ from: 'color' }}
                        sliceLabelsSkipAngle={10}
                        sliceLabelsTextColor="#ffffff"
                    />
                </div>
            </div>
            {/* 진행 상황 */}
            <div className={styles.progressContainer}>
                <p className={styles.progressTitle}>현재 진행 상황</p>
                <div className={styles.progressBar}>
                    <div
                        className={styles.progress}
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <p className={styles.progressText}>
                    진행률: {progressPercentage}% ({remainingDays}일 남음)
                </p>
            </div>
        </div>
    );
};

export default GoalAnalysis;