import React from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";

const AccountModal = ({ selectedDate, incomeList, expenseList, onClose }) => {
    if (!selectedDate) return null;

    // `selectedDate`를 안전하게 `Date` 객체로 변환
    let dateObject;
    try {
        dateObject = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
        if (isNaN(dateObject.getTime())) throw new Error("Invalid Date");
    } catch (error) {
        console.error("Invalid selectedDate:", selectedDate);
        return <div>잘못된 날짜 형식입니다.</div>;
    }

    const dayToString = (day) => {
        switch (day) {
            case "Sun":
                return "일요일";
            case "Mon":
                return "월요일";
            case "Tue":
                return "화요일";
            case "Wed":
                return "수요일";
            case "Thu":
                return "목요일";
            case "Fri":
                return "금요일";
            case "Sat":
                return "토요일";
            default:
                return "알 수 없는 요일";
        }
    };

    const monthToString = (month) => {
        switch (month) {
            case "Jan":
                return "1";
            case "Feb":
                return "2";
            case "Mar":
                return "3";
            case "Apr":
                return "4";
            case "May":
                return "5";
            case "Jun":
                return "6";
            case "Jul":
                return "7";
            case "Aug":
                return "8";
            case "Sep":
                return "9";
            case "Oct":
                return "10";
            case "Nov":
                return "11";
            case "Dec":
                return "12";
            default:
                return "Invalid Month";
        }
    };

    const dateISO = dateObject.toISOString().split("T")[0]; // ISO 8601 포맷으로 변환
    const day = dateISO.split("-")[2]; // 일자 추출
    const dayOfTheWeek = dayToString(dateObject.toString().slice(0, 3)); // 요일 추출
    const month = dateISO.split("-")[1]; // 월 추출

    console.log("Selected Date:", dateISO);
    console.log("income List:", incomeList);

    // 선택된 날짜의 데이터 필터링
    const filteredIncome = incomeList?.filter((item) => item.incomeAt.split("T")[0] === dateISO) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === dateISO) || [];

    console.log("Filtered Income:", filteredIncome);
    console.log("Filtered Expense:", filteredExpense);

    // 수입과 지출을 하나의 배열로 합치고 시간 역순으로 정렬
    const combinedList = [...filteredIncome.map((item) => ({ ...item, type: "income" })),
        ...filteredExpense.map((item) => ({ ...item, type: "expense" }))]
        .sort((a, b) => new Date(b.type === "income" ? b.incomeAt : b.expenseAt)
            - new Date(a.type === "income" ? a.incomeAt : a.expenseAt));

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <span
                    className={styles.close}
                    onClick={onClose}
                >×</span>
                <h2>{month}월 {+day + 1}일 {dayOfTheWeek} 사용 내역</h2>

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