import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, incomeList, expenseList, onClose }) => {
    if (!selectedDate) return null;

    const [year, month, day] = selectedDate.split("-");
    const displayDate = `${month}월 ${day}일`;

    const filteredIncome = incomeList?.filter((item) => item.incomeAt.split("T")[0] === selectedDate) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === selectedDate) || [];

    const combinedList = [...filteredIncome.map((item) => ({ ...item, type: "income" })),
        ...filteredExpense.map((item) => ({ ...item, type: "expense" }))]
        .sort((a, b) => new Date(b.type === "income" ? b.incomeAt : b.expenseAt)
            - new Date(a.type === "income" ? a.incomeAt : a.expenseAt));

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{displayDate} 사용 내역</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    {combinedList.length > 0 ? (
                        combinedList.map((item, index) => (
                            <div key={index} className={styles.detailItem}>
                                <div className={styles.detailCategory}>{item.category}</div>
                                <div className={styles.detailDescription}>{item.description}</div>
                                <div className={`${styles.detailAmount} ${item.type === "expense" ? styles.expense : ""}`}>
                                    {item.type === "income"
                                        ? `+${item.amount.toLocaleString()}원`
                                        : `-${item.amount.toLocaleString()}원`}
                                </div>
                                <div className={styles.detailTime}>
                                    {item.type === "income"
                                        ? item.incomeAt.split("T")[1].split(".")[0]
                                        : item.expenseAt.split("T")[1].split(".")[0]}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noDetails}>내역이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountModal;