import React, { useState } from "react";
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import AccountModal from "../../../modal/AccountModal";

const AccountBook = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // 모달에 표시할 날짜

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDay = new Date(firstDayOfMonth);
    startDay.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    const lastDayOfMonth = new Date(year, month + 1, 0);
    const endDay = new Date(lastDayOfMonth);
    endDay.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

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
                        {week.map((date, idx) => (
                            <div
                                key={idx}
                                className={`${styles.day} ${
                                    date.getMonth() === currentDate.getMonth() ? styles.currentMonth : ""
                                }`}
                                onClick={() => setSelectedDate(`${date.getMonth() + 1}월 ${date.getDate()}일`)}
                            >
                                {date.getDate()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/*여기에 내역 props로 보냄*/}
            <AccountModal selectedDate={selectedDate} onClose={() => setSelectedDate(null)} />
        </div>
    );
};

export default AccountBook;