import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import AccountModal from "../../../modal/AccountModal";

const AccountBook = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 여부

    const userData = useSelector((state) => state.userInfo.userData);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 현재 달의 첫 날
    const firstDayOfMonth = new Date(year, month, 1);
    // 달력 시작 날짜를 현재 달의 첫 날의 주의 일요일로 설정
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    // 현재 달의 마지막 날
    const lastDayOfMonth = new Date(year, month + 1, 0);
    // 달력 끝 날짜를 현재 달의 마지막 날의 주의 토요일로 설정
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    /** startDay부터 endDay까지의 날짜를 주 단위로 그룹화하는 함수 */
    const groupDatesByWeek = (startDay, endDay) => {
        const weeks = [];
        let currentWeek = [];
        let currentDate = new Date(startDay);

        while (currentDate <= endDay) {
            currentWeek.push(new Date(currentDate));
            if (currentWeek.length === 7 || currentDate.getDay() === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    };

    const weeks = groupDatesByWeek(startDay, endDay);

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setModalOpen(true);
    };

    return (
        <div className={styles.accountBook}>
            <div className={styles.header}>
                <button className={styles.navButton} onClick={handlePrevMonth}>
                    이전 달
                </button>
                <h2>
                    {year}년 {month + 1}월
                </h2>
                <button className={styles.navButton} onClick={handleNextMonth}>
                    다음 달
                </button>
            </div>
            <div className={styles.calendar}>
                <div className={styles.week}>
                    <span>일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span>토</span>
                </div>
                {weeks.map((week, index) => (
                    <div key={index} className={styles.week}>
                        {week.map((date, idx) => {
                            const dateStr = date.toISOString().split("T")[0];
                            const dailyIncome = userData.importList?.filter(
                                (item) => item.importAt.split("T")[0] === dateStr
                            ).reduce((acc, curr) => acc + curr.amount, 0);
                            const dailyExpense = userData.expenseList?.filter(
                                (item) => item.expenseAt.split("T")[0] === dateStr
                            ).reduce((acc, curr) => acc + curr.amount, 0);

                            return (
                                <div
                                    key={idx}
                                    className={`${styles.day} ${
                                        date.getMonth() === currentDate.getMonth() ? styles.currentMonth : ""
                                    }`}
                                    onClick={() => handleDayClick(date)}
                                >
                                    <span>{date.getDate()}</span>
                                    {dailyIncome ? <span className={styles.income}>+{dailyIncome}</span> : null}
                                    {dailyExpense ? <span className={styles.expense}>-{dailyExpense}</span> : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {modalOpen && (
                <AccountModal
                    selectedDate={selectedDate}
                    importList={userData.importList}
                    expenseList={userData.expenseList}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AccountBook;