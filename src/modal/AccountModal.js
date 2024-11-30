import React, {useEffect, useState} from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import {EXPENSE_URL, INCOME_URL} from "../config/host-config";
import {useDispatch, useSelector} from "react-redux";
import {userInfoActions} from "../components/store/user/UserInfoSlice";

const AccountModal = ({ selectedDate, incomeList, expenseList, onClose }) => {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null); // 열린 메뉴의 인덱스

    // if (!selectedDate) return null;

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userInfo.userData);

    const [year, month, day] = selectedDate.split("-");
    const displayDate = `${month}월 ${day}일`;

    const filteredIncome = incomeList?.filter((item) => item.incomeAt.split("T")[0] === selectedDate) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === selectedDate) || [];

    const combinedList = [
        ...filteredIncome.map((item) => ({ ...item, type: "income" })),
        ...filteredExpense.map((item) => ({ ...item, type: "expense" })),
    ].sort(
        (a, b) =>
            new Date(b.type === "income" ? b.incomeAt : b.expenseAt) -
            new Date(a.type === "income" ? a.incomeAt : a.expenseAt)
    );

    const toggleMenu = (idx) => {
        setMenuOpenIndex((prevIndex) => (prevIndex === idx ? null : idx)); // 같은 메뉴를 클릭하면 닫음

    };

    const closeAllMenus = () => {
        setMenuOpenIndex(null); // 모든 메뉴 닫기
    };

    const deleteHandler = async (item) => {
        let updatedList;
        if (item.type === "income") {
            await fetch(`${INCOME_URL}/${item.id}/${userData.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "Application/json"},
            })
            updatedList = userData.incomeList.filter(s => s.id !== item.id)
            dispatch(userInfoActions.updateUser({...userData, incomeList: updatedList, currentMoney: userData.currentMoney - item.amount}))
        } else {
            await fetch(`${EXPENSE_URL}/${item.id}/${userData.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "Application/json"},
            })
            updatedList = userData.expenseList.filter(s => s.id !== item.id)
            dispatch(userInfoActions.updateUser({...userData, expenseList: updatedList, currentMoney: userData.currentMoney + item.amount}))
        }
        alert("삭제가 완료되었습니다.")
    }

    return (
        <div
            className={styles.modalOverlay}
            onClick={() => {
                closeAllMenus(); // 외부 클릭 시 모든 메뉴 닫기
                onClose(); // 모달 닫기
            }}
        >
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{displayDate} 사용 내역</h2>
                    <button
                        className={styles.closeButton}
                        onClick={() => {
                            closeAllMenus(); // 메뉴 닫기
                            onClose(); // 모달 닫기
                        }}
                    >
                        ×
                    </button>
                </div>
                <div className={styles.detailsContainer}>
                    {combinedList.length > 0 ? (
                        combinedList.map((item, index) => (
                            <div
                                key={index}
                                className={styles.detailItem}
                                onClick={(e) => e.stopPropagation()} // 내부 클릭 시 전파 방지
                            >
                                <div className={styles.flex}>
                                    <span className={styles.detailCategory}>{item.category}</span>
                                    <BsThreeDotsVertical
                                        onClick={(e) => {
                                            e.stopPropagation(); // 이벤트 전파 방지
                                            toggleMenu(index); // 해당 메뉴 토글
                                        }}
                                        className={styles.settings}
                                    />
                                </div>
                                {menuOpenIndex === index && ( // 해당 인덱스의 메뉴가 열려 있는 경우에만 표시
                                    <div className={styles.menu}>
                                        <div
                                            className={styles.menuList}

                                        >
                                            수정
                                        </div>
                                        <hr className={styles.line} />
                                        <div
                                            className={styles.menuList}
                                            onClick={() => deleteHandler(item)}
                                        >
                                            삭제
                                        </div>
                                    </div>
                                )}
                                <div className={styles.detailDescription}>{item.description}</div>
                                <div
                                    className={`${styles.detailAmount} ${
                                        item.type === "expense" ? styles.expense : ""
                                    }`}
                                >
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