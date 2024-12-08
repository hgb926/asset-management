import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from "../styles/goal/AddGoalModal.module.scss";

const AddGoalModal = ({ modalHandler }) => {

    // const [category, setCategory] = useState("")
    // const [description, setDescription] = useState("")
    // const [targetAmount, setTargetAmount] = useState(0);
    // const [startDate, setStartDate] = useState("")
    // const [endDate, setEndDate] = useState("")

    const [selectedType, setSelectedType] = useState("income");
    const modalRef = useRef();
    const inputRefs = {
        category: useRef(null),
        description: useRef(null),
        targetAmount: useRef(null),
        startDate: useRef(null),
        endDate: useRef(null),
    };

    const globalModalCloseHandler = (e) => {
        // 배경 클릭 시 모달 닫기
        if (modalRef.current && e.target === modalRef.current) {
            modalHandler(false);
        }
    };

    useEffect(() => {
        const closeOnEscapeKey = (e) => {
            if (e.key === "Escape") {
                modalHandler(false); // ESC 키로 모달 닫기
            }
        };
        document.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [modalHandler]);

    return ReactDOM.createPortal(
        <div
            className={styles.overlay} // 오버레이 스타일 추가
            ref={modalRef}
            onClick={globalModalCloseHandler}
        >
            <div className={styles.modalWrap}>
                <h1 className={styles.h1}>새로운 목표를 설정해주세요!</h1>
                <span
                    className={styles.closeButton}
                    onClick={() => modalHandler(false)}
                >
                    ×
                </span>
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
                <div className={styles.inputWrap}>
                    <label className={styles.label}>카테고리</label>
                    <input
                        ref={inputRefs.category}
                        className={styles.input}
                        type="text"
                        name="category"
                        placeholder={selectedType === 'income' ? "ex) 저축" : "ex) 식비, 쇼핑"}
                        // onChange={inputChangeHandler}
                        // onFocus={() => focusHandler("passwordCheck")}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>설명</label>
                    <input
                        ref={inputRefs.description}
                        className={styles.input}
                        type="text"
                        name="description"
                        placeholder={selectedType === 'income' ? "ex) 한달 내 700,000만원 저축" : "ex) 이번달 식비 500,000 만원"}
                        // onChange={inputChangeHandler}
                        // onFocus={() => focusHandler("passwordCheck")}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>목표금액</label>
                    <input
                        ref={inputRefs.targetAmount}
                        className={styles.input}
                        type="number"
                        name="targetAmount"
                        // onChange={inputChangeHandler}
                        // onFocus={() => focusHandler("passwordCheck")}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>시작일</label>
                    <input
                        ref={inputRefs.startDate}
                        className={styles.input}
                        type="date"
                        name="startDate"
                        // onChange={inputChangeHandler}
                        // onFocus={() => focusHandler("passwordCheck")}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>종료일</label>
                    <input
                        ref={inputRefs.endDate}
                        className={styles.input}
                        type="date"
                        name="endDate"
                        // onChange={inputChangeHandler}
                        // onFocus={() => focusHandler("passwordCheck")}
                    />
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") // Portal로 렌더링
    );
};

export default AddGoalModal;