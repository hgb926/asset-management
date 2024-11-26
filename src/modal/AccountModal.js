import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, importList, expenseList, onClose }) => {
    if (!selectedDate) return null;

    const dateStr = selectedDate.toISOString().split("T")[0];

    // 선택된 날짜의 데이터 필터링
    const filteredIncome = importList?.filter((item) => item.importAt.split("T")[0] === dateStr) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === dateStr) || [];

    // 시간 역순 정렬
    const sortedIncome = filteredIncome.sort((a, b) => new Date(b.importAt) - new Date(a.importAt));
    const sortedExpense = filteredExpense.sort((a, b) => new Date(b.expenseAt) - new Date(a.expenseAt));

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span
                    className={styles.close}
                    onClick={onClose}
                >×</span>
                <h2>{dateStr} 내역</h2>

                <div className={styles.details}>
                    <h3>수입</h3>
                    {sortedIncome.length > 0 ? (
                        sortedIncome.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <p>종류: {item.category}</p>
                                <p>설명: {item.description}</p>
                                <p>금액: +{item.amount}원</p>
                                <p>시간: {item.importAt.split("T")[1].split(".")[0]}</p>
                            </div>
                        ))
                    ) : (
                        <p>수입 내역이 없습니다.</p>
                    )}
                    <h3>지출</h3>
                    {sortedExpense.length > 0 ? (
                        sortedExpense.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <p>종류: {item.category}</p>
                                <p>설명: {item.description}</p>
                                <p>금액: -{item.amount}원</p>
                                <p>시간: {item.expenseAt.split("T")[1].split(".")[0]}</p>
                            </div>
                        ))
                    ) : (
                        <p>지출 내역이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountModal;