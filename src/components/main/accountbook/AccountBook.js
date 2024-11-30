import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import AccountModal from "../../../modal/AccountModal";
import { EXPENSE_URL, INCOME_URL } from "../../../config/host-config";
import {userInfoActions} from "../../store/user/UserInfoSlice";

const AccountBook = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜
    const [modalOpen, setModalOpen] = useState(false); // 모달 열림 여부
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("import");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");

    const userData = useSelector((state) => state.userInfo.userData);
    const dispatch = useDispatch();

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

    // 날짜를 로컬 시간 기준으로 YYYY-MM-DD 형식으로 포맷
    const formatDateToLocal = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로 맞춤
        const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로 맞춤
        return `${year}-${month}-${day}`; // 항상 YYYY-MM-DD 형식 반환
    };

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

    const nextMonthHandler = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonthHandler = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const dayClickHandler = (date) => {
        const formattedDate = formatDateToLocal(date); // YYYY-MM-DD 형식으로 변환
        setSelectedDate(formattedDate); // 문자열로 저장
        setModalOpen(true);
    };
    const addModalOpenHandler = () => {
        setAddModalOpen(true);
    };

    const addAccountHandler = async () => {

        if (!category || !amount) {
            alert("빈 값 받지않는다")
            return;
        }

        const payload = {
            category,
            userId: userData.id,
            amount,
            description,
        };
        console.log(payload);
        if (selectedType === "import") {

            const response = await fetch(`${INCOME_URL}/add-income`, {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const newImportItem = await response.json();
                const updatedIncomeList = [...userData.incomeList, newImportItem]
                const updatedUserData = {
                    ...userData,
                    incomeList: updatedIncomeList,
                    currentMoney: +userData.currentMoney + +amount
                }
                dispatch(userInfoActions.updateUser(updatedUserData))
            }

        } else {
            const response = await fetch(`${EXPENSE_URL}/add-expense`, {
                method: "POST",
                headers: { "Content-Type": "Application/json" },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const newExpenseItem = await response.json(); // 서버로부터 반환된 새 지출 데이터
                const updatedExpenseList = [...userData.expenseList, newExpenseItem]; // 기존 expenseList에 새 데이터 추가

                const updatedUserData = {
                    ...userData,
                    expenseList: updatedExpenseList,
                    currentMoney: +userData.currentMoney - (+amount)
                };

                dispatch(userInfoActions.updateUser(updatedUserData)); // Redux 상태 업데이트
            }
        }
        setAddModalOpen(false)
    };

    useEffect(() => {

    }, [userData.currentMoney, userData.incomeList, userData.expenseList]);



    return (
        <div className={styles.accountBook}>
            <div className={styles.header}>
                <button className={styles.navButton} onClick={prevMonthHandler}>
                    이전 달
                </button>
                <h2>
                    {year}년 {month + 1}월
                </h2>
                <button className={styles.navButton} onClick={nextMonthHandler}>
                    다음 달
                </button>
            </div>

            <div className={styles.flex}>
                <div></div>
                {userData && typeof userData.currentMoney === "number" ? (
                    <div className={styles.currentMoney}>
                        총 자산 : {userData.currentMoney.toLocaleString("ko-KR")}원
                    </div>
                ) : (
                    <div className={styles.currentMoney}>총 자산 : 데이터 로딩 중...</div>
                )}
                <div className={styles.addBtn} onClick={addModalOpenHandler}>
                    +
                </div>
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
                            const dateStr = formatDateToLocal(date); // 로컬 시간 기준으로 날짜 포맷팅
                            const dailyIncome = (userData.incomeList || []) // undefined일 경우 빈 배열로 처리
                                .filter((item) => item.incomeAt.split("T")[0] === dateStr)
                                .reduce((acc, curr) => acc + curr.amount, 0);


                            const dailyExpense = (userData.expenseList || [])
                                .filter((item) => item.expenseAt.split("T")[0] === dateStr)
                                .reduce((acc, curr) => acc + curr.amount, 0);

                            return (
                                <div
                                    key={idx}
                                    className={`${styles.day} ${
                                        date.getMonth() === currentDate.getMonth() ? styles.currentMonth : ""
                                    } ${
                                        formatDateToLocal(date) === formatDateToLocal(new Date())
                                            ? styles.today
                                            : ""
                                    }`}
                                    onClick={() => dayClickHandler(date)}
                                >
                                    <span>{date.getDate()}</span>
                                    {dailyIncome ? <span className={styles.income}>+{dailyIncome.toLocaleString("ko-KR")}</span> : null}
                                    {dailyExpense ? <span className={styles.expense}>-{dailyExpense.toLocaleString("ko-KR")}</span> : null}
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
            {addModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setAddModalOpen(false)}>
                    <div className={styles.addModal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.addModalHeader}>
                            <h3 className={styles.h3}>새로운 내역 추가</h3>
                            <span className={styles.closeButton} onClick={() => setAddModalOpen(false)}>
                                ×
                            </span>
                        </div>

                        <div className={styles.addModalToggle}>
                            <div
                                className={`${styles.toggleOption} ${selectedType === "import" ? styles.active : ""}`}
                                onClick={() => setSelectedType("import")}
                            >
                                수입
                            </div>
                            <div
                                className={`${styles.toggleOption} ${selectedType === "expense" ? styles.expenseActive : ""}`}
                                onClick={() => setSelectedType("expense")}
                            >
                                지출
                            </div>
                        </div>

                        <div className={styles.addModalBody}>
                            <form>
                                <label>
                                    금액:
                                    <input
                                        type="number"
                                        placeholder="금액을 입력하세요"
                                        className={styles.input}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </label>
                                <label>
                                    카테고리:
                                    <input
                                        type="text"
                                        placeholder="카테고리를 입력하세요"
                                        className={styles.input}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </label>
                                <label>
                                    세부설명:
                                    <textarea
                                        placeholder="세부설명을 입력하세요 (생략 가능)"
                                        className={styles.textarea}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </label>
                                <div className={styles.confirmButton} onClick={addAccountHandler}>
                                    확인
                                </div>
                                <div className={styles.cancelButton} onClick={() => setAddModalOpen(false)}>
                                    취소
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AccountBook;