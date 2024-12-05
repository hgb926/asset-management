import React from 'react';
import ExpenseLineChart from "./ExpenseLineChart.js";
import styles from '../../../styles/analysis/Analysis.module.scss'

const Analysis = () => {
    return (
        <div className={styles.container}>
            <ExpenseLineChart/>
        </div>
    );
};

export default Analysis;