import React from 'react';
import styles from '../../../styles/report/Report.module.scss'
import IncomeReport from "../analysis/IncomeReport";


const Report = () => {
    return (
        <div className={styles.reportWrap}>
            <div className={styles.incomeWrap}>
                <h2 className={styles.h2}>수입</h2>
                <div>
                    <IncomeReport/>
                </div>
            </div>
            <div className={styles.expenseWrap}>
                <h2 className={styles.h2}>지출</h2>
                <div>

                </div>
            </div>
        </div>
    );
};

export default Report;