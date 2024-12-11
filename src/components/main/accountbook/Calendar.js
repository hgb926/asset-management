import React, {useState} from 'react';
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import {useSelector} from "react-redux";
import AccountModal from "../../../modal/AccountModal";

const Calendar = ({ currentDate }) => {

    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 여부
    const [hoveredDate, setHoveredDate] = useState(null)
    let mostExpenseDay;

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

    // 날짜를 로컬 시간 기준으로 YYYY-MM-DD 형식으로 포맷
    const formatDateToLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로 맞춤
        const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로 맞춤
        return `${year}-${month}-${day}`; // 항상 YYYY-MM-DD 형식 반환
    };

    const dayClickHandler = (date) => {
        if (date > new Date()) return;
        const formattedDate = formatDateToLocal(date); // YYYY-MM-DD 형식으로 변환
        setSelectedDate(formattedDate); // 문자열로 저장
        setModalOpen(true);
    };



//     해볼것:  미래 일자는 클릭,hover 안되게끔
    return (
        <>
            <div className={styles.calendar}>
                <div className={styles.week}>
                    <span className={styles.holiday}>일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span className={styles.saturday}>토</span>
                </div>
                {weeks.map((week, index) => (
                    <div key={index} className={styles.week}>
                        {week.map((date, idx) => {
                            const dateStr = formatDateToLocal(date); // 로컬 시간 기준으로 날짜 포맷팅
                            const dailyIncome = (userData.incomeList || [])
                                .filter((item) => item.incomeAt && typeof item.incomeAt === "string") // incomeAt 유효성 검사
                                .filter((item) => item.incomeAt.split("T")[0] === dateStr)
                                .reduce((acc, curr) => acc + curr.amount, 0);

                            const dailyExpense = (userData.expenseList || [])
                                .filter((item) => item.expenseAt && typeof item.expenseAt === "string") // expenseAt 유효성 검사
                                .filter((item) => item.expenseAt.split("T")[0] === dateStr)
                                .reduce((acc, curr) => acc + curr.amount, 0);


                            return (
                                <div
                                    key={idx}
                                    onMouseOver={() => setHoveredDate(dateStr)}
                                    onMouseOut={() => setHoveredDate(null)}
                                    className={`${styles.day} ${
                                        date.getMonth() === currentDate.getMonth() ? styles.currentMonth : ""
                                    } ${
                                        formatDateToLocal(date) === formatDateToLocal(new Date())
                                            ? styles.today
                                            : ""
                                    } ${
                                     hoveredDate === dateStr ? styles.active : ""   
                                    }
                                    `}
                                    onClick={() => dayClickHandler(date)}
                                >
                                    <span>{date.getDate()}</span>
                                    {dailyIncome ? <span
                                        className={styles.income}>+{dailyIncome.toLocaleString("ko-KR")}</span> : null}
                                    {dailyExpense ? <span
                                        className={styles.expense}>-{dailyExpense.toLocaleString("ko-KR")}</span> : null}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {modalOpen && (
                <AccountModal
                    selectedDate={selectedDate}
                    incomeList={userData.incomeList}
                    expenseList={userData.expenseList}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
};

export default Calendar;