import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일
import styles from "../../../styles/goal/DateRangePicker.module.scss"; // 커스텀 스타일

const DateRangePicker = ({ dayPickerHandler }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0"); // 날짜 2자리
        const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 2자리
        return `${date.getFullYear()}-${month}-${day}`; // "YYYY-MM-DD"
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        dayPickerHandler(formatDate(date), "start");
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        dayPickerHandler(formatDate(date), "end");
    };

    return (
        <div className={styles.datePickerContainer}>
            <div className={styles.datePickerWrapper}>
                <label className={styles.label}>시작일</label>
                <DatePicker
                    value={startDate}
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    className={styles.datePicker}
                />
            </div>
            <div className={styles.datePickerWrapper}>
                <label className={styles.label}>종료일</label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜 선택"
                    className={styles.datePicker}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;