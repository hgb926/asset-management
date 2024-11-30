import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, incomeList, expenseList, onClose }) => {
    if (!selectedDate) return null;

    // `selectedDate`는 이미 YYYY-MM-DD 형식의 문자열
    const [year, month, day] = selectedDate.split("-"); // YYYY-MM-DD 분리
    const displayDate = `${month}월 ${day}일`;

    // 데이터 필터링
    const filteredIncome = incomeList?.filter((item) => item.incomeAt.split("T")[0] === selectedDate) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === selectedDate) || [];

    // 수입과 지출을 하나의 배열로 합치고 시간 역순으로 정렬
    const combinedList = [...filteredIncome.map((item) => ({ ...item, type: "income" })),
        ...filteredExpense.map((item) => ({ ...item, type: "expense" }))]
        .sort((a, b) => new Date(b.type === "income" ? b.incomeAt : b.expenseAt)
            - new Date(a.type === "income" ? a.incomeAt : a.expenseAt));

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span className={styles.close} onClick={onClose}>×</span>
                <h2>{displayDate} 사용 내역</h2>

                <div className={styles.details}>
                    {combinedList.length > 0 ? (
                        combinedList.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <p>종류: {item.category}</p>
                                <p>설명: {item.description}</p>
                                <p>
                                    금액:{" "}
                                    {item.type === "income"
                                        ? `+${item.amount.toLocaleString()}원`
                                        : `-${item.amount.toLocaleString()}원`}
                                </p>
                                <p>
                                    시간:{" "}
                                    {item.type === "income"
                                        ? item.incomeAt.split("T")[1].split(".")[0]
                                        : item.expenseAt.split("T")[1].split(".")[0]}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>내역이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountModal;