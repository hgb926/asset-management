import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from "../styles/goal/AddGoalModal.module.scss";
import DateRangePicker from "../components/main/goal/DateRangePicker";
import {GOAL_URL} from "../config/host-config";
import {useDispatch, useSelector} from "react-redux";
import {userInfoActions} from "../components/store/user/UserInfoSlice";

const AddGoalModal = ({modalHandler}) => {

    const userData = useSelector(state => state.userInfo.userData);
    const dispatch = useDispatch();
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [targetAmount, setTargetAmount] = useState(0);
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [selectedType, setSelectedType] = useState("income");

    const [formValue, setFormValue] = useState({
        category: "",
        description: "",
        targetAmount: "",
        startDate: "",
        endDate: ""
    })

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


    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});

        switch (name) {
            case "category":
                setCategory(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "targetAmount":
                setTargetAmount(value);
                break;
            default:
                break;
        }
    }

    const dayPickerHandler = (value, type) => {
        switch (type) {
            case "start":
                setStartDate(value);
                break
            case "end" :
                setEndDate(value)
                break;
            default:
                break;
        }
    }

    const addGoalHandler = async () => {
        const payload = {
            userId: userData.id,
            category,
            description,
            type: selectedType,
            targetAmount,
            startDate,
            endDate
        }
        console.log(payload)
        if (!category || !description || !targetAmount || !startDate || !endDate) {
            alert("빈 값 받지않는다!")
            return
        }
        // const payload = {
        //     userId: userData.id,
        //     category,
        //     description,
        //     targetAmount,
        //     startDate,
        //     endDate
        // }
        const response = await fetch(`${GOAL_URL}/goal`, {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            const newGoal = await response.json();
            const updatedUserData = {
                ...userData,
                goalList: [...userData.goalList, newGoal],
            }
            dispatch(userInfoActions.updateUser(updatedUserData))
            alert("목표가 성공적으로 등록되었습니다")
        } else {
            alert("등록 실패!")
        }
    }


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
                        onChange={inputChangeHandler}
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
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>목표금액</label>
                    <input
                        ref={inputRefs.targetAmount}
                        className={styles.input}
                        type="number"
                        name="targetAmount"
                        placeholder={"숫자만 입력해주세요 ex) 700000"}
                        onChange={inputChangeHandler}
                    />
                </div>
                <DateRangePicker dayPickerHandler={dayPickerHandler} />
                <div className={styles.btnWrap}>
                    <div className={styles.confirmButton}
                        onClick={addGoalHandler}
                    >
                        확인
                    </div>
                    <div className={styles.cancelButton} onClick={() => modalHandler(false)}>
                        취소
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root") // Portal로 렌더링
    );
};

export default AddGoalModal;