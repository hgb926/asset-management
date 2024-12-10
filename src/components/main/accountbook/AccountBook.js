import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import { EXPENSE_URL, INCOME_URL } from "../../../config/host-config";
import {userInfoActions} from "../../store/user/UserInfoSlice";
import AccountHeader from "./AccountHeader.js";
import Calendar from "./Calendar.js";

const AccountBook = () => {

    const [currentDate, setCurrentDate] = useState(new Date())
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [categoryDropdown, setCategoryDropdown] = useState(false)
    const [aboutGoal, setAboutGoal] = useState(false)

    const userData = useSelector((state) => state.userInfo.userData);
    const dispatch = useDispatch();


    const addAccountHandler = async () => {
        if (!category || !amount) {
            alert("빈 값 받지 않습니다.");
            return;
        }

        const payload = {
            category,
            userId: userData.id,
            amount: +amount, // 숫자로 변환
            description,
        };

        const isIncome = selectedType === "income";
        const apiUrl = isIncome ? `${INCOME_URL}/add-income` : `${EXPENSE_URL}/add-expense`;
        const adjustment = isIncome ? +amount : -amount; // 수입은 더하고, 지출은 뺀다

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const newItem = await response.json(); // 서버로부터 반환된 새 항목
            const updatedList = isIncome
                ? [...userData.incomeList, newItem]
                : [...userData.expenseList, newItem];

            // 목표 갱신 로직
            const updatedGoalList = userData.goalList.map((goal) => {
                if (goal.category === category) {
                    const updatedInfluencedMoney = goal.influencedMoney + +amount; // 기존 영향을 받은 금액 + 현재 금액
                    const updatedProgress = Math.min(
                        100,
                        Math.round((updatedInfluencedMoney / goal.targetAmount) * 1000) / 10 // 진행률 계산 (0~100, 소수점 한자리)
                    );

                    return {
                        ...goal,
                        influencedMoney: updatedInfluencedMoney,
                        currentProgress: updatedProgress,
                    };
                }
                return goal;
            });

            // 사용자 데이터 업데이트
            const updatedUserData = {
                ...userData,
                incomeList: isIncome ? updatedList : userData.incomeList,
                expenseList: !isIncome ? updatedList : userData.expenseList,
                currentMoney: +userData.currentMoney + adjustment, // 현재 잔액 갱신
                goalList: updatedGoalList, // 목표 리스트 갱신
            };

            // Redux와 localStorage에 업데이트
            dispatch(userInfoActions.updateUser(updatedUserData));
            localStorage.setItem("userData", JSON.stringify(updatedUserData)); // localStorage에 저장
        }

        setAddModalOpen(false); // 모달 닫기
    };


    useEffect(() => {

    }, [userData.currentMoney, userData.incomeList, userData.expenseList]);

    const temp = [];
    if (selectedType === "income") {
        for (let i = 0; i < userData.incomeList.length; i++) {
            temp.push(userData.incomeList[i].category)
        }
    } else {
        for (let i = 0; i < userData.expenseList.length; i++) {
            temp.push(userData.expenseList[i].category)
        }
    }
    const categorySet = new Set([...temp]);


    return (
        <div className={styles.accountBook}>
            <AccountHeader
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                onAddModalOpen={() => setAddModalOpen(true)}
            />
            <Calendar
                currentDate={currentDate}
            />
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
                                className={`${styles.toggleOption} ${selectedType === "income" ? styles.active : ""}`}
                                onClick={() => setSelectedType("income")}
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
                                        value={category}
                                        onClick={() => setCategoryDropdown((prev) => !prev)}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                { (categoryDropdown && categorySet.size > 0) &&
                                    <div className={styles.categoryWrap}>
                                        {Array.from(categorySet).map((ct, idx) => (
                                            <div
                                                className={styles.category}
                                                key={idx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCategory(ct)
                                                    setCategoryDropdown(false)
                                                }
                                            }
                                            >
                                                {ct}
                                            </div>
                                        ))}
                                    </div>
                                }
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