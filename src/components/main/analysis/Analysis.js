import React from 'react';
import ExpenseLineChart from './ExpenseLineChart';
import styles from '../../../styles/analysis/Analysis.module.scss';

const Analysis = () => {
    return (
        <div className={styles.analysisContainer}>
            <header className={styles.header}>
                <h1>소비 및 잔액 분석</h1>
                <p>지난 소비 및 잔액의 변동을 확인하세요.</p>
            </header>
            <div className={styles.chartWrap}>
                <ExpenseLineChart />
            </div>
        </div>
    );
};

export default Analysis;