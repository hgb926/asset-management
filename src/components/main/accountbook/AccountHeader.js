import React, {useState} from 'react';
import styles from "../../../styles/accountbook/AccountBook.module.scss";
import {useDispatch, useSelector} from "react-redux";

const AccountHeader = ({ currentDate, setCurrentDate, onAddModalOpen}) => {

    const [addModalOpen, setAddModalOpen] = useState(false);

    const userData = useSelector((state) => state.userInfo.userData);
    const dispatch = useDispatch();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const nextMonthHandler = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonthHandler = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const addModalOpenHandler = () => {
        setAddModalOpen(true);
    };

    return (
        <>
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
                <div></div>
                <div className={styles.addBtn} onClick={onAddModalOpen}>
                    +
                </div>
            </div>
        </>
    );
};

export default AccountHeader;