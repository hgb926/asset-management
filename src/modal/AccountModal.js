import React, {useState} from "react";
import styles from "../styles/accountbook/AccountModal.module.scss";
import {BsThreeDotsVertical} from "react-icons/bs";
import {EXPENSE_URL, INCOME_URL} from "../config/host-config";
import {useDispatch, useSelector} from "react-redux";
import {userInfoActions} from "../components/store/user/UserInfoSlice";

const AccountModal = ({selectedDate, incomeList, expenseList, onClose}) => {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [modifyMode, setModifyMode] = useState(null); // 수정 모드
    const [editedItem, setEditedItem] = useState({}); // 수정 중인 데이터
    const [originalAmount, setOriginalAmount] = useState(0); // 수정 전 금액 저장

    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userInfo.userData);

    const [year, month, day] = selectedDate.split("-");
    const displayDate = `${month}월 ${day}일`;

    const filteredIncome = incomeList?.filter((item) => item.incomeAt.split("T")[0] === selectedDate) || [];
    const filteredExpense = expenseList?.filter((item) => item.expenseAt.split("T")[0] === selectedDate) || [];

    const combinedList = [
        ...filteredIncome.map((item) => ({...item, type: "income"})),
        ...filteredExpense.map((item) => ({...item, type: "expense"})),
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
        setModifyMode((prevIndex) => (prevIndex === item.id ? null : item.id));
        setEditedItem(item); // 수정 모드 활성화 시 선택한 항목을 `editedItem`에 저장
        setOriginalAmount(item.amount); // 수정 전 금액 저장
    };

    const cancelHandler = () => {
        setModifyMode(null); // 수정 모드 종료
    };

    const saveHandler = async () => {
        const payload = {
            category: editedItem.category,
            userId: userData.id,
            description: editedItem.description,
            amount: editedItem.amount,
        }
        console.log(payload)
        if (editedItem.type === "income") {
            const response = await fetch(`${INCOME_URL}/${editedItem.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const updatedList = userData.incomeList.map(i => i.id === editedItem.id
                    ? {
                        ...i,
                        category: editedItem.category,
                        description: editedItem.description,
                        amount: editedItem.amount
                    }
                    : i
                );

                dispatch(userInfoActions.updateUser({
                    ...userData,
                    incomeList: updatedList,
                    currentMoney: userData.currentMoney - originalAmount + editedItem.amount
                }))
            }

        } else {
            const response = await fetch(`${EXPENSE_URL}/${editedItem.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const updatedList = userData.expenseList.map(e =>
                    e.id === editedItem.id
                    ? { ...e, category: editedItem.category, description: editedItem.description, amount: editedItem.amount}
                        : e
                )
                dispatch(userInfoActions.updateUser({
                    ...userData,
                    expenseList: updatedList,
                    currentMoney: userData.currentMoney + originalAmount - editedItem.amount
                }))
            }
        }
        alert("수정 완료!");
        setModifyMode(null); // 수정 모드 종료
    };

    const deleteHandler = async (item) => {
        let updatedList;
        if (item.type === "income") {
            await fetch(`${INCOME_URL}/${item.id}/${userData.id}`, {
                method: "DELETE",
                headers: {"Content-Type": "Application/json"},
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
                headers: {"Content-Type": "Application/json"},
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
                    {combinedList.map((item, index) => (
                        <div
                            key={index}
                            className={styles.detailItem}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {modifyMode === item.id ? (
                                // 특정 div만 수정 모드
                                <div>
                                    <span className={styles.detailCategory}>카테고리</span>
                                    <input
                                        className={styles.inputCategory}
                                        value={editedItem.category}
                                        onChange={(e) =>
                                            setEditedItem((prev) => ({
                                                ...prev,
                                                category: e.target.value,
                                            }))
                                        }
                                    />
                                    <div className={styles.detailDescription}>세부사항</div>
                                    <input
                                        className={styles.inputDescription}
                                        value={editedItem.description}
                                        onChange={(e) =>
                                            setEditedItem((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                    />
                                    <span>금액</span>
                                    <input
                                        type="number"
                                        className={styles.inputAmount}
                                        value={editedItem.amount}
                                        onChange={(e) =>
                                            setEditedItem((prev) => ({
                                                ...prev,
                                                amount: +e.target.value,
                                            }))
                                        }
                                    />
                                    <div className={styles.confirm}>
                                        <button className={styles.saveButton} onClick={saveHandler}>
                                            수정
                                        </button>
                                        <div onClick={cancelHandler} className={styles.cancel}>
                                            취소
                                        </div>
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
                                    {/*잔액 계산 알고리즘 만들어보기*/}
                                    {/*<span className={styles.currentMoney}>{userData.currentMoney.toLocaleString("ko-KR")}원</span>*/}
                                    <span className={styles.detailTime}>
                                        {item.type === "income"
                                            ? item.incomeAt.split("T")[1].split(".")[0]
                                            : item.expenseAt.split("T")[1].split(".")[0]}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccountModal;