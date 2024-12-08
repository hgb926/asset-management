import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 기본 스타일
import styles from "../../../styles/goal/DateRangePicker.module.scss"; // 커스텀 스타일

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div className={styles.datePickerContainer}>
            <div className={styles.datePickerWrapper}>
                <label className={styles.label}>시작일</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜 선택"
                    className={styles.datePicker}
                />
            </div>
            <div className={styles.datePickerWrapper}>
                <label className={styles.label}>종료일</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="날짜 선택"
                    className={styles.datePicker}
                />
            </div>
        </div>
    );
};

export default DateRangePicker;