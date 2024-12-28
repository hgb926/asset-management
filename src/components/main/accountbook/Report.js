import React from 'react';
import styles from '../../../styles/report/Report.module.scss'
import IncomeReport from "../analysis/IncomeReport.js";
import ExpenseReport from "../analysis/ExpenseReport.js";


const Report = () => {
    return (
        <div className={styles.reportWrap}>
            <div className={styles.incomeWrap}>
                <div>
                    <IncomeReport/>
                </div>
            </div>
            <div className={styles.expenseWrap}>
                <div>
                    <ExpenseReport/>
                </div>
            </div>
        </div>
    );
};

export default Report;