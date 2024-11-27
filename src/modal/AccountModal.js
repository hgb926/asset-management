import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, importList, expenseList, onClose }) => {
    if (!selectedDate) return null;

    const dateStr = selectedDate.toISOString().split("T")[0];

    // 선택된 날짜의 데이터 필터링
    const filteredIncome = importList?.filter((item) => item.importAt.split("T")[0] === dateStr) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === dateStr) || [];

    // 수입과 지출을 하나의 배열로 합치고 시간 역순으로 정렬
    const combinedList = [...filteredIncome.map((item) => ({ ...item, type: "income" })),
        ...filteredExpense.map((item) => ({ ...item, type: "expense" }))]
        .sort((a, b) => new Date(b.type === "income" ? b.importAt : b.expenseAt)
            - new Date(a.type === "income" ? a.importAt : a.expenseAt));

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span
                    className={styles.close}
                    onClick={onClose}
                >×</span>
                <h2>{dateStr} 내역</h2>

                <div className={styles.details}>
                    {combinedList.length > 0 ? (
                        combinedList.map((item, index) => (
                            <div key={index} className={styles.item}>
                                <p>종류: {item.category}</p>
                                <p>설명: {item.description}</p>
                                <p>
                                    금액:{" "}
                                    {item.type === "income"
                                        ? `+${item.amount}원`
                                        : `-${item.amount}원`}
                                </p>
                                <p>
                                    시간:{" "}
                                    {item.type === "income"
                                        ? item.importAt.split("T")[1].split(".")[0]
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
// 이제 할거 디자인, redux데이터 업데이트, 추가버튼