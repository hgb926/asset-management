import React, { useState } from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";
import { BsThreeDotsVertical } from "react-icons/bs";
import { EXPENSE_URL, INCOME_URL } from "../config/host-config";
import { useDispatch, useSelector } from "react-redux";
import { userInfoActions } from "../components/store/user/UserInfoSlice";

const AccountModal = ({ selectedDate, incomeList, expenseList, onClose }) => {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [modifyMode, setModifyMode] = useState(null); // 수정 모드
    const [editedItem, setEditedItem] = useState({}); // 수정 중인 데이터

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userInfo.userData);

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
        setMenuOpenIndex((prevIndex) => (prevIndex === idx ? null : idx));
    };

    const closeAllMenus = () => {
        setMenuOpenIndex(null);
    };

    const toggleModify = (item) => {
        const idx = item.id;
        setModifyMode((prevIndex) => (prevIndex === idx ? null : idx));
        setEditedItem(item); // 수정 모드가 활성화될 때 선택한 항목의 데이터로 설정
    };

    const handleInputChange = (e, field) => {
        setEditedItem((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const saveHandler = () => {
        // Save the edited data
        // 여기에 API 요청 로직을 추가
        setModifyMode(null); // 수정 모드 종료
        alert("수정 완료!");
    };

    const deleteHandler = async (item) => {
        let updatedList;
        if (item.type === "income") {
            await fetch(`${INCOME_URL}/${item.id}/${userData.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },
            });
            updatedList = userData.incomeList.filter((s) => s.id !== item.id);
            dispatch(
                userInfoActions.updateUser({
                    ...userData,
                    incomeList: updatedList,
                    currentMoney: userData.currentMoney - item.amount,
                })
            );
        } else {
            await fetch(`${EXPENSE_URL}/${item.id}/${userData.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "Application/json" },
            });
            updatedList = userData.expenseList.filter((s) => s.id !== item.id);
            dispatch(
                userInfoActions.updateUser({
                    ...userData,
                    expenseList: updatedList,
                    currentMoney: userData.currentMoney + item.amount,
                })
            );
        }
        alert("삭제가 완료되었습니다.");
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={() => {
                closeAllMenus();
                onClose();
            }}
        >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{displayDate} 사용 내역</h2>
                    <button
                        className={styles.closeButton}
                        onClick={() => {
                            closeAllMenus();
                            onClose();
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
                                onClick={(e) => e.stopPropagation()}
                            >
                                {modifyMode === item.id ? (
                                    // 수정 모드
                                    <div>
                                        <span className={styles.detailCategory}>카테고리</span>
                                        <input
                                            className={styles.inputCategory}
                                            value={editedItem.category}
                                            onChange={(e) => handleInputChange(e, "category")}
                                        />
                                        <div className={styles.detailDescription}>세부사항</div>
                                        <input
                                            className={styles.inputDescription}
                                            value={editedItem.description}
                                            onChange={(e) => handleInputChange(e, "description")}
                                        />
                                        <span>금액</span>
                                        <input
                                            type="number"
                                            className={styles.inputAmount}
                                            value={editedItem.amount}
                                            onChange={(e) => handleInputChange(e, "amount")}
                                        />
                                        <div className={styles.confirm}>
                                            <button className={styles.saveButton} onClick={saveHandler}>
                                                수정
                                            </button>
                                            <div className={styles.cancel}>취소</div>
                                        </div>
                                    </div>
                                ) : (
                                    // 일반 모드
                                    <div>
                                        <div className={styles.flex}>
                                            <span className={styles.detailCategory}>{item.category}</span>
                                            <BsThreeDotsVertical
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMenu(index);
                                                }}
                                                className={styles.settings}
                                            />
                                        </div>
                                        {menuOpenIndex === index && (
                                            <div className={styles.menu}>
                                                <div
                                                    className={styles.menuList}
                                                    onClick={() => toggleModify(item)}
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
                                )}
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