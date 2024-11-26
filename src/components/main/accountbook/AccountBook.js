import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/accountbook/AccountBook.module.scss";

const AccountBook = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const userData = useSelector(state => state.userInfo.userData);

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

    // 데이터 그룹화 함수
    const groupDataByDate = (data) => {
        return data.reduce((acc, item) => {
            const dateKey = item.importAt?.split("T")[0] || item.expenseAt?.split("T")[0];
            if (!dateKey) return acc;
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(item);
            return acc;
        }, {});
    };

    const groupedImports = groupDataByDate(userData.importList || []);
    const groupedExpenses = groupDataByDate(userData.expenseList || []);
    const combinedData = { ...groupedImports, ...groupedExpenses };

    // 다음 달 이동
    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // 이전 달 이동
    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // 주 단위 그룹화 함수
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
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className={styles.week}>
                        {week.map((date, dayIndex) => {
                            const dateKey = date.toISOString().split("T")[0];
                            const dailyData = combinedData[dateKey] || [];
                            const isToday = date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth();

                            return (
                                <div
                                    key={dayIndex}
                                    className={`${styles.day} ${
                                        date.getMonth() === currentDate.getMonth() ? styles.currentMonth : ""
                                    } ${isToday ? styles.today : ""}
                                    ${date.getDay() === 0 ? styles.holiday : ""}
                                    ${date.getDay() === 6 ? styles.saturday : ""}`}
                                >
                                    <div className={styles.date}>{date.getDate()}</div>
                                    {dailyData.length > 0 && (
                                        <ul className={styles.dataList}>
                                            {dailyData.map((item, idx) => (
                                                <li key={idx}>{item.description} - {item.amount}원</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AccountBook;