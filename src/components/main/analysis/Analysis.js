import React from 'react';
import ExpenseLineChart from './ExpenseLineChart';
import styles from '../../../styles/analysis/Analysis.module.scss';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const Analysis = () => {
    const {expenseList, incomeList} = useSelector((state) => state.userInfo.userData);

    return (
        <>
            {(incomeList.length || expenseList.length) ?
                <>
            <div className={styles.analysisContainer}>
            <header className={styles.header}>
                <h1>소비 및 잔액 분석</h1>
                 <p>지난 소비 및 잔액의 변동을 확인하세요.</p>
            </header>
            </div>
                </>
                :
                ""
            }
            {
                (incomeList.length || expenseList.length) ?
                    (<div className={styles.chartWrap}>
                        <ExpenseLineChart/>
                    </div>)
                    :
                    <div className={styles.noneWrap}>
                        <h1 className={styles.none}>아직 그래프를 표시할 수 없습니다! 😅</h1>
                        <Link to={'/'} className={styles.link}>수입/지출 등록하러 가기</Link>
                    </div>
            }
        </>
    );
};

export default Analysis;